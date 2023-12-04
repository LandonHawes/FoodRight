import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import styles from "../styles/MacroCard.module.css";

export default function macroCard(props) {
  const [calories, setCalories] = useState(0);

  const [carbs, setCarbs] = useState(0);

  const [fats, setFats] = useState(0);

  const [proteins, setProteins] = useState(0);

  const [savedState, setSavedState] = useState({});

  // set the state if the user has already entered the values
  useEffect(() => {
    console.log(Object.keys(props.getMacroInfo()).length > 0);
    if (
      Object.keys(savedState).length == 0 &&
      Object.keys(props.getMacroInfo()).length > 0
    ) {
      const macroinfo = props.getMacroInfo();
      setSavedState(macroinfo);
      console.log(macroinfo["calories"]);
      setCalories(macroinfo["calories"]);
      setCarbs(macroinfo["carbs"]);
      setFats(macroinfo["fats"]);
      setProteins(macroinfo["proteins"]);
    }
  }, [props.orderStep]);
  function getcalorievalue(e) {
    if (e.target.value > 2000) {
      toast.error("Please enter a value less than 2000");
    } else {
      setCalories(e.target.value);
    }
  }

  // functions to get the value of the carbs/fat/protein input
  function getcarbvalue(e) {
    if (parseInt(e.target.value) + parseInt(fats) + parseInt(proteins) > 100) {
      toast.error("Total Macro Percent cannot be greater than 100");
      setCarbs(100 - (parseInt(fats) + parseInt(proteins)));
    } else {
      setCarbs(e.target.value);
    }
  }

  function getfatvalue(e) {
    if (parseInt(e.target.value) + parseInt(carbs) + parseInt(proteins) > 100) {
      toast.error("Total Macro Percent cannot be greater than 100");
      setFats(100 - (parseInt(carbs) + parseInt(proteins)));
    } else {
      setFats(e.target.value);
    }
  }

  function getproteinvalue(e) {
    if (parseInt(e.target.value) + parseInt(carbs) + parseInt(fats) > 100) {
      toast.error("Total Macro Percent cannot be greater than 100");
      setProteins(100 - (parseInt(carbs) + parseInt(fats)));
    } else {
      setProteins(e.target.value);
    }
  }

  // check no values are zero and the total macro percent is 100 and the calories are greater than 500
  function macroSubmit() {
    if (calories == 0) {
      toast.error("Please Enter Calories");
    } else if (carbs == null || carbs == 0) {
      toast.error("Please Enter Carbs");
    } else if (fats == null || fats == 0) {
      toast.error("Please Enter Fats");
    } else if (proteins == null || proteins == 0) {
      toast.error("Please Enter Proteins");
    } else if (parseInt(carbs) + parseInt(fats) + parseInt(proteins) != 100) {
      toast.error("Total Macro Percent should be 100");
    } else if (calories < 500) {
      toast.error("Please Enter Calories greater than 500");
    } else {
      props.setOrdersetter(1);
      const equationCalorieData = {
        carbs: parseInt(calories * (carbs / 100)),
        fats: parseInt(calories * (fats / 100)),
        proteins: parseInt(calories * (proteins / 100)),
      };
      props.calorieDataSetter(equationCalorieData);
      props.weightDataSetter({
        carbs: parseInt(equationCalorieData.carbs / 4),
        fats: parseInt(equationCalorieData.fats / 9),
        proteins: parseInt(equationCalorieData.proteins / 4),
      }),
        props.setMacroinfosetter({
          calories: parseInt(calories),
          carbs: parseInt(carbs),
          fats: parseInt(fats),
          proteins: parseInt(proteins),
        });
    }
  }

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12">
        <div className={`${styles.testcard2} card border-primary mb-3`}>
          <div className="card-body">
            <div className="row text-center">
              <div className="col-12">
                <h1 className={styles.inputheader}>First Things First</h1>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <p className={styles.inputtextstylecard2}>
                  Before we can create your meal plan we need to know a little
                  bit about what youre looking for.
                </p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <p className={styles.inputtextstylecard2}>
                  To start, we first need to know your desired calorie intake.
                </p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <p className={styles.inputtextstylecard2}>
                  After that we need to get a little bit more specific.
                </p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <p className={styles.inputtextstylecard2}>
                  We need to know your desired macro split.
                </p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <p className={styles.inputtextstylecard2}>
                  After those steps have been completed submit your <br></br>
                  macros and we can you get you some meals!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-12">
        <div
          className={`${styles.testcard1} card border-primary mb-3 testcard1`}
        >
          <div
            className={`${styles.formcardheader} row text-center form-card-header`}
          >
            <h1 className={`${styles.macrogoalstxt} col-12`}>
              Meal Macro Goals
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12 col-12 mt-3 d-flex justify-content-center">
              <label className={styles.calorielabel}>
                <p className={`${styles.totaltxtstyle} inputtextstyle `}>
                  Calories
                </p>
                <input
                  className={styles.caloriemacroinput}
                  type="number"
                  placeholder="0"
                  onChange={getcalorievalue}
                  value={calories}
                ></input>
                <p className={`${styles.kcaltxtstyle} inputtextstyle `}>
                  {" "}
                  kcal
                </p>
              </label>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4 col-4 d-flex justify-content-center ">
              <label className={styles.macrolabel}>
                <button
                  className={styles.increaseBtn}
                  onClick={() => {
                    if (carbs < 100) {
                      // add five to carbs as long as all the macros are less than 100
                      if (
                        parseInt(carbs) + parseInt(fats) + parseInt(proteins) <
                        100
                      ) {
                        setCarbs(
                          Math.min(
                            parseInt(carbs) + 5,
                            100 - (parseInt(fats) + parseInt(proteins))
                          )
                        );
                        // setCarbs(parseInt(carbs) + 5);
                      }
                    }
                  }}
                >
                  <Image src="/images/uparrow.png" width="20" height="20" />
                </button>

                <input
                  className={styles.macroinput}
                  step="5"
                  min="0"
                  max="100"
                  type="number"
                  placeholder="0"
                  onChange={getcarbvalue}
                  value={carbs}
                ></input>
                <p className="inputtextstyle">Carbs %</p>
                <button
                  className={styles.decreaseBtn}
                  onClick={() => {
                    // subtract five from carbs as long as carbs is greater than 0
                    if (carbs > 0) {
                      setCarbs(Math.max(parseInt(carbs) - 5, 0));
                    }
                  }}
                >
                  <Image
                    className={styles.decreaseBtnIcon}
                    src="/images/downarrow.png"
                    width="20"
                    height="20"
                  />
                </button>
              </label>
            </div>
            <div className="col-md-4 col-4 d-flex justify-content-center">
              <label className={styles.macrolabel}>
                <button
                  className={styles.decreaseBtn}
                  onClick={() => {
                    if (fats < 100) {
                      // add five to fats as long as all the macros are less than 100
                      if (
                        parseInt(carbs) + parseInt(fats) + parseInt(proteins) <
                        100
                      ) {
                        setFats(
                          Math.min(
                            parseInt(fats) + 5,
                            100 - (parseInt(carbs) + parseInt(proteins))
                          )
                        );
                      }
                    }
                  }}
                >
                  <Image src="/images/uparrow.png" width="20" height="20" />
                </button>
                <input
                  className={styles.macroinput}
                  step="5"
                  min="0"
                  max="100"
                  type="number"
                  placeholder="0"
                  onChange={getfatvalue}
                  value={fats}
                ></input>
                <p className="inputtextstyle">Fats %</p>
                <button
                  className={styles.decreaseBtn}
                  onClick={() => {
                    // subtract five from fats as long as fats is greater than 0
                    if (fats > 0) {
                      setFats(Math.max(parseInt(fats) - 5, 0));
                    }
                  }}
                >
                  <Image
                    className={styles.decreaseBtnIcon}
                    src="/images/downarrow.png"
                    width="20"
                    height="20"
                  />
                </button>
              </label>
            </div>
            <div className="col-md-4 col-4 d-flex justify-content-center ">
              <label className={styles.macrolabel}>
                <button
                  className={styles.increaseBtn}
                  onClick={() => {
                    if (proteins < 100) {
                      // add five to proteins as long as all the macros are less than 100
                      if (
                        parseInt(carbs) + parseInt(fats) + parseInt(proteins) <
                        100
                      ) {
                        setProteins(
                          Math.min(
                            parseInt(proteins) + 5,
                            100 - (parseInt(carbs) + parseInt(fats))
                          )
                        );
                      }
                    }
                  }}
                >
                  <Image src="/images/uparrow.png" width="20" height="20" />
                </button>
                <input
                  className={styles.macroinput}
                  step="5"
                  min="0"
                  max="100"
                  type="number"
                  placeholder="0"
                  onChange={getproteinvalue}
                  value={proteins}
                ></input>
                <p className="useFont">Proteins %</p>
                <button
                  className={styles.decreaseBtn}
                  onClick={() => {
                    // subtract five from proteins as long as proteins is greater than 0
                    if (proteins > 0) {
                      setProteins(Math.max(parseInt(proteins) - 5, 0));
                    }
                  }}
                >
                  <Image
                    className={styles.decreaseBtnIcon}
                    src="/images/downarrow.png"
                    width="20"
                    height="20"
                  />
                </button>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-12">
              <button
                className={`${styles.caloriesubmitbutton} d-flex justify-content-center`}
                onClick={() => {
                  macroSubmit();
                }}
              >
                Submit Macros
              </button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-12">
              <h1 className={styles.formulaheader}>
                Our formula makes your meal
              </h1>
            </div>
            <div className="col-md-6 col-12 ">
              <p className={styles.formulatext}>
                Upon submitting your macros our algorithim will create meal
                options based on your desired choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
