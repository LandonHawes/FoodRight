import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSupabase } from "../pages/api/auth/supabaseContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to the login page if not authenticated
      toast.error("You must be logged in to access this page");
    }
  }, [user, router]);

  return <>{user && children}</>; // Render the children only if the user is authenticated
};

export default ProtectedRoute;
