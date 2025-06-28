import { useEffect } from 'react';
import { supabase } from './config/supabase';

export default function TestSignInComponent() {
  useEffect(() => {
    async function test() {
      console.log('TestSignInComponent: before signIn');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'wandile@gmail.com',
        password: 'Admin123' // <-- Replace with your actual password for testing
      });
      console.log('TestSignInComponent: after signIn', { data, error });
    }
    test();
  }, []);
  return <div>Testing signIn...</div>;
} 