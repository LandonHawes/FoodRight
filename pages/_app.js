import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fendstyles.css";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/manrope";
import { useEffect } from "react";
import { SupabaseProvider } from "./api/auth/supabaseContext";

function MyApp({ Component, pageProps }) {
  return (
    <SupabaseProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
        <ToastContainer autoClose={6000} />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
      </UserProvider>
    </SupabaseProvider>
  );
}

export default MyApp;
