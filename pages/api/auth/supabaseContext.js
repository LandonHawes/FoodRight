import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with your Supabase project URL and client key
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    setSupabase(supabaseClient);

    const session = supabaseClient.auth.session();
    setUser(session?.user || null);

    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      data.unsubscribe();
    };
  }, []);

  const value = { supabase, user };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
