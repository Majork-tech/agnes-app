-- Profiles table to store user information and roles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT CHECK (role IN ('student', 'admin', 'parent')) NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parent signup requests table
CREATE TABLE parent_signup_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT UNIQUE NOT NULL,
  
  -- Parent Information
  parent_first_name TEXT NOT NULL,
  parent_last_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  relationship TEXT NOT NULL,
  
  -- Child Information
  child_first_name TEXT NOT NULL,
  child_last_name TEXT NOT NULL,
  child_grade TEXT NOT NULL,
  child_school TEXT NOT NULL,
  child_email TEXT,
  
  -- Contact Details
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT NOT NULL,
  additional_notes TEXT,
  
  -- Request Status
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  auto_password TEXT NOT NULL,
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT,
  rejected_by TEXT
);

-- Quiz results table (if not already exists)
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  quiz_title TEXT NOT NULL,
  quiz_grade TEXT NOT NULL,
  quiz_topic TEXT NOT NULL,
  quiz_subtopic TEXT NOT NULL,
  student_answers JSONB,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_parent_requests_status ON parent_signup_requests(status);
CREATE INDEX idx_parent_requests_email ON parent_signup_requests(parent_email);
CREATE INDEX idx_parent_requests_submitted ON parent_signup_requests(submitted_at);
CREATE INDEX idx_quiz_results_student ON quiz_results(student_id);
CREATE INDEX idx_quiz_results_quiz ON quiz_results(quiz_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_signup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for parent_signup_requests table
CREATE POLICY "Anyone can insert parent signup requests" ON parent_signup_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all parent signup requests" ON parent_signup_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update parent signup requests" ON parent_signup_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for quiz_results table
CREATE POLICY "Students can view their own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Parents can view their child's quiz results" ON quiz_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_signup_requests 
      WHERE parent_email = (
        SELECT email FROM profiles WHERE id = auth.uid()
      ) AND status = 'approved'
    )
  );

CREATE POLICY "Admins can view all quiz results" ON quiz_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.settings.jwt_secret" = 'your-jwt-secret';

-- Create registration requests table
CREATE TABLE IF NOT EXISTS registration_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    grade_level INTEGER,
    parent_guardian_name VARCHAR(200),
    parent_guardian_phone VARCHAR(20),
    parent_guardian_email VARCHAR(255),
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    medical_conditions TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    admin_notes TEXT,
    CONSTRAINT valid_grade_level CHECK (grade_level > 0 AND grade_level <= 12)
);

-- Create an index on status for faster filtering
CREATE INDEX idx_registration_status ON registration_requests(status);

-- Create an index on email for faster lookups
CREATE INDEX idx_registration_email ON registration_requests(email);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registration_requests_updated_at
    BEFORE UPDATE ON registration_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE registration_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert a registration request
CREATE POLICY "allow_insert_registration_requests" ON registration_requests
    FOR INSERT
    WITH CHECK (true);

-- Allow admins to view and update all registration requests
CREATE POLICY "admins_manage_registration_requests" ON registration_requests
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users
            WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Allow public to view their own registration request status using email
CREATE POLICY "view_own_registration_request" ON registration_requests
    FOR SELECT
    USING (
        email = current_setting('request.jwt.claims')::json->>'email'
    ); 