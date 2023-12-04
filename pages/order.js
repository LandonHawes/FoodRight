import Navbar from "../components/Navbar";
import Head from "next/head";
import OrderComp from "../components/Ordering";
import React, { useState, useEffect } from "react";
import MacroCard from "../components/macroCard";
import ProtectedRoute from "../components/protectedRoute";

export default function Order() {
  const [orderstep, setOrderstep] = useState(0);

  function setOrdersetter(orderstep) {
    setOrderstep(orderstep);
  }

  const [macroinfo, setMacroinfo] = useState([]);

  function setMacroinfosetter(macroinfo) {
    setMacroinfo(macroinfo);
  }

  function getMacroInfo() {
    return macroinfo;
  }

  const [calorieData, setCalorieData] = useState(null);
  const [weightData, setWeightData] = useState(null);

  function weightDataSetter(weightData) {
    setWeightData(weightData);
  }

  function calorieDataSetter(totalcalorie) {
    setCalorieData(totalcalorie);
  }

  function getCalorieData() {
    return calorieData;
  }

  function getWeightData() {
    return weightData;
  }

  return (
    <ProtectedRoute>
      <div className="page-background">
        <Head>
          <title>Order Page</title>
          <meta name="description" content="Order website Page" />
          <link rel="icon" href="" />
        </Head>
        <div className="text-center">
          <Navbar />
        </div>
        {orderstep == 0 && (
          <MacroCard
            setOrdersetter={setOrdersetter}
            setMacroinfosetter={setMacroinfosetter}
            getMacroInfo={getMacroInfo}
            calorieDataSetter={calorieDataSetter}
            weightDataSetter={weightDataSetter}
            orderStep={orderstep}
          />
        )}

        {orderstep == 1 && (
          <OrderComp
            getMacroInfo={getMacroInfo}
            setOrdersetter={setOrdersetter}
            getCalorieData={getCalorieData}
            getWeightData={getWeightData}
            calorieDataSetter={calorieDataSetter}
            weightDataSetter={weightDataSetter}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
