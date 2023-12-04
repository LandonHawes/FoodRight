import React from "react";
import Cards from "./cardSection";

export default function FavMeals() {
  return (
    <>
      <div className="row text-center">
        <div className="col-12">
          <h1 className="favorite-meals-tag">Favorite Meals</h1>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          <hr className="hr-line"></hr>
        </div>
      </div>
      <Cards />
    </>
  );
}
