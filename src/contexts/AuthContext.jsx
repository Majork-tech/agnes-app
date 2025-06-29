// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for existing session on mount
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
      setLoading(false);
    });
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (user) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (!error && data) {
      setProfile(data);
      setUserRole(data.role);
    } else {
      setProfile(null);
      setUserRole(null);
    }
    setLoading(false);
  };

  const signIn = async ({ email, password }) => {
    setLoading(true);
    console.log('Attempting to sign in with:', { email, role: 'hidden' });
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    console.log('Sign in result:', { success: !error, error: error?.message });
    
    if (error) {
      setLoading(false);
      return { error };
    }
    setUser(data.user);
    await fetchProfile(data.user);
    setIsAuthenticated(true);
    setLoading(false);
    return { user: data.user };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
    setUserRole(null);
    setLoading(false);
  };

  const signUp = async ({ email, password, ...rest }) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      return { error };
    }
    // Optionally insert profile data
    if (data.user) {
      await supabase.from('profiles').insert([{ id: data.user.id, email, ...rest }]);
      await fetchProfile(data.user);
    }
    setUser(data.user);
    setIsAuthenticated(true);
    setLoading(false);
    return { user: data.user };
  };

  const value = {
    user,
    profile,
    loading,
    isAuthenticated,
    userRole,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
