import React, { useEffect, useState } from "react";
import styles from "../styles/Arrivals.module.css";
import { toast } from "react-toastify";

export default function SurveyCard() {
  const [tastyData, setTastyData] = useState(null);
  const [menuItem, setMenuItem] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  // handle survey logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuItem, shortDescription }),
    });

    const data = await response.json();
    console.log(data);

    setMenuItem("");
    setShortDescription("");
    toast.success("Thanks for your input!");
  };
  return (
    <div className="row d-flex justify-content-center">
      <div
        className={`${styles.newarrivalwidth} shadow-lg p-3 mb-5 bg-white rounded`}
      >
        <div className="card">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="row text-center mt-3">
                <div className="col-12">
                  <h1 className={styles.harrival}>
                    We Always Want Your Input!
                  </h1>
                </div>
              </div>
              <div className="row text-center mt-3">
                <div className="col-12">
                  <p className={styles.parrival}>
                    FoodRight is committed to the community it serves, and
                    <br></br>
                    because of that we want to hear from you! If you have
                    <br></br>
                    any suggestions for new menu items, please let us know!
                  </p>
                  <h2 className={styles.harrival}>
                    Fill out Our Survey to let us know
                    <br></br>
                    what you want to see
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="row text-center d-flex justify-content-center">
                <form>
                  <div className="col-12 mt-5">
                    <label
                      className={`${styles.menuItem} mb-2`}
                      htmlFor="menuItem"
                    >
                      Menu Item:
                    </label>
                    <input
                      className={styles.menuInput}
                      type="text"
                      id="menuItem"
                      name="menuItem"
                      required
                      value={menuItem}
                      onChange={(e) => setMenuItem(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label
                      className={`${styles.menuItem} mb-2`}
                      htmlFor="description"
                    >
                      Short Description:
                    </label>
                    <textarea
                      className={styles.menuInput}
                      id="description"
                      name="description"
                      rows="4"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="row text-center mt-4 mb-4">
                <div className="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
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
