-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  team_id UUID REFERENCES teams(id),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check-ins table
CREATE TABLE checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  check_in TIMESTAMP WITH TIME ZONE NOT NULL,
  check_out TIMESTAMP WITH TIME ZONE,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats table
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  date DATE NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge codes table
CREATE TABLE challenge_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE checkins;
ALTER PUBLICATION supabase_realtime ADD TABLE stats;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_codes;

-- Create indexes for performance
CREATE INDEX idx_checkins_user_id ON checkins(user_id);
CREATE INDEX idx_checkins_check_out ON checkins(check_out);
CREATE INDEX idx_stats_user_id ON stats(user_id);
CREATE INDEX idx_stats_date ON stats(date);
CREATE INDEX idx_challenge_codes_active ON challenge_codes(active);

-- Function to calculate weekly hours
CREATE OR REPLACE FUNCTION get_weekly_hours(start_date TIMESTAMP WITH TIME ZONE)
RETURNS TABLE(
  user_id UUID,
  name TEXT,
  team TEXT,
  hours NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.user_id,
    u.name,
    t.name as team,
    ROUND(SUM(
      EXTRACT(EPOCH FROM (
        COALESCE(c.check_out, NOW()) - c.check_in
      )) / 3600
    )::numeric, 1) as hours
  FROM checkins c
  JOIN users u ON c.user_id = u.id
  LEFT JOIN teams t ON u.team_id = t.id
  WHERE c.check_in >= start_date
  GROUP BY c.user_id, u.name, t.name
  ORDER BY hours DESC;
END;
$$ LANGUAGE plpgsql;