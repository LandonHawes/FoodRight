import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import styles from "../styles/Arrivals.module.css";
import { toast } from "react-toastify";
import Image from "next/image";

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

export default function ArrivalsCard() {
  const [tastyData, setTastyData] = useState(null);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  const handleInsertData = async (email) => {
    console.log(email);
    if (!email) return;
    await axios.post("/api/auth/supabasenews", { email: email }).then((res) => {
      console.log(res);
    });
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Handle subscribe logic
  const handleSubscribe = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      await handleInsertData(email);

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        toast.success("Thanks for Subscribing!");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Fetch data logic for tasty API
  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/list",
      params: {
        from: "0",
        size: "2",
        tags: "under_30_minutes",
      },
      headers: {
        "X-RapidAPI-Key": "f3c9272c17mshff14d020dec4b11p142106jsn88a87e5bb9cd",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.results);
      setTastyData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tastyData) return;
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [tastyData]);

  // Render logic
  if (error) {
    return <div>Error fetching Tasty API: {error.message}</div>;
  }

  if (!tastyData) {
    return (
      <div className="row d-flex justify-content-center">
        <div
          className={`${styles.newarrivalwidth} shadow-lg p-3 mb-5 bg-white rounded`}
        >
          <div className="card">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <h1 className={styles.harrival}>
                      Check out our new arrivals!
                    </h1>
                  </div>
                </div>
                <div className="row text-center mt-3">
                  <div className="col-12">
                    <p className={styles.parrival}>
                      Here at FoodRight we love food, and because of that were{" "}
                      <br></br>
                      always trying to create new menu items for you to enjoy.
                      <br></br>
                    </p>
                    <h2 className={styles.harrival}>
                      See for yourself what our chefs have been cooking up!
                    </h2>
                  </div>
                </div>
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <h1 className={styles.parrival}>
                      Dont forget to sign up for our newsletter to stay up to
                      date!
                    </h1>
                  </div>
                </div>
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => openModal()}
                    >
                      Sign up for newsletter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div
          className={`${styles.newarrivalwidth} shadow-lg p-3 mb-5 bg-white rounded`}
        >
          <div className="card">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <h1 className={styles.harrival}>
                      Check out our new arrivals!
                    </h1>
                  </div>
                </div>
                <div className="row text-center mt-3">
                  <div className="col-12">
                    <p className={styles.parrival}>
                      Here at FoodRight we love food, and because of that were{" "}
                      <br></br>
                      always trying to create new menu items for you to enjoy.
                      <br></br>
                    </p>
                    <h2 className={styles.harrival}>
                      See for yourself what our chefs have been cooking up!
                    </h2>
                  </div>
                </div>
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <h1 className={styles.parrival}>
                      Dont forget to sign up for our newsletter to stay up to
                      date!
                    </h1>
                  </div>
                </div>
                <div className="row text-center mt-5">
                  <div className="col-12">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => openModal()}
                    >
                      Sign up for newsletter
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="container my-5">
                  <div className="row text-center">
                    {tastyData.map((recipe) => (
                      <div className="col-6">
                        <Image
                          className="image-card"
                          src={recipe.thumbnail_url}
                          width="400px"
                          height="400px"
                        />
                        <div className="card-body">
                          <p className={styles.foodtitle}>{recipe.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newsletterModalLabel">
                FoodRight Signup
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => closeModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="p-blog">
                Sign up for our newsletter to receive updates and exclusive
                offers:
              </p>
              <form>
                <div className="form-group">
                  <label className="p-blog" for="email">
                    Email address:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  onClick={() => {
                    handleSubscribe();
                    closeModal();
                  }}
                  type="submit"
                  className="btn btn-primary modal-sub-btn"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
