-- Enable RLS on the table
ALTER TABLE parent_signup_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for registration form)
CREATE POLICY "Allow public insert"
ON parent_signup_requests
FOR INSERT
TO public
USING (true);

-- Allow admins to select requests
CREATE POLICY "Admins can select parent signup requests"
ON parent_signup_requests
FOR SELECT
TO public
USING (
  auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
  )
);

-- Allow admins to update requests
CREATE POLICY "Admins can update parent signup requests"
ON parent_signup_requests
FOR UPDATE
TO public
USING (
  auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
  )
);

-- Allow admins to delete requests
CREATE POLICY "Admins can delete parent signup requests"
ON parent_signup_requests
FOR DELETE
TO public
USING (
  auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
  )
); 