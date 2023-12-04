import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Modal from "react-modal";
import React, { useCallback, useEffect, useState } from "react";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { createClient } from "@supabase/supabase-js";
import { useSupabase } from "../pages/api/auth/supabaseContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "25%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    borderRadius: "19px",
  },
};

export default function Navbar() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalOption, setModalOption] = useState("sign_in");
  const { user } = useSupabase();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out failed:", error.message);
      } else {
        console.log("User signed out successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error.message);
    }
  };

  // TODO: Clean up the useEffect and add a cleanup
  useEffect(() => {
    const handleAuthStateChange = (event, session) => {
      if (session?.user) {
        console.log("Authentication state changed");
        window.location.reload();
      }
    };

    const unsubscribe = supabase.auth.onAuthStateChange(handleAuthStateChange);
  }, [supabase]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="row">
        <nav
          className={`${styles.navbackground} navbar navbar-expand-lg navbar-dark py fixed-static-top`}
        >
          <div className="col-2">
            <Link href="/">
              <a className={styles.brand}>
                <Image src="/images/Lport.png" width="50" height="50" />
              </a>
            </Link>
            <button
              className="navbar-toggler navtogglercolor"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="col-8">
            <div
              className={`${styles.marginrightnav} justify-content-center collapse navbar-collapse`}
              id="navmenu"
            >
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link href="/">
                    <a className={`${styles.linkB} nav-link`}>Home</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/about">
                    <a className={`${styles.linkB} nav-link`}>About</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/order">
                    <a className={`${styles.linkB} nav-link`}>Order</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/newarrivals">
                    <a className={`${styles.linkB} nav-link`}>New</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2">
            {!user && (
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <button
                    className={`${styles.loginbutton} nav-link modal-button`}
                    onClick={() => {
                      setModalOption("sign_in");
                      openModal();
                    }}
                  >
                    Login{" "}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`${styles.signupbutton} nav-link modal-button`}
                    onClick={() => {
                      setModalOption("sign_up");
                      openModal();
                    }}
                  >
                    Sign-up
                  </button>
                </li>
              </ul>
            )}
            {user && (
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <button
                    className={`${styles.signupbutton} nav-link modal-button`}
                    onClick={handleSignOut}
                  >
                    Sign-Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        id={"signup-Modal"}
      >
        <div className="row">
          <div className="col-7">
            <h2>
              {(modalOption == "sign_in" && "Sign in") || "Create account"}
            </h2>
          </div>
        </div>
        <Auth
          // socialColors={true}
          view={modalOption}
          supabaseClient={supabase}
          socialButtonSize="xlarge"
        />
      </Modal>
    </>
  );
}
