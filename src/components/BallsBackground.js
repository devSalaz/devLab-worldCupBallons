import React from "react";
import BallBackground from "./BallBackground";

const BallsBackground = ({ countriesState, setCurrentCountry }) => {
  return (
    <>
      {countriesState.map((country, index) => {
        return (
          <BallBackground
            country={country}
            positionZ={-110 - Math.random() * 90}
            key={`ballBG${index}`}
            setCurrentCountry={setCurrentCountry}
            indexBall={index}
          />
        );
      })}
      {countriesState.map((country, index) => {
        return (
          <BallBackground
            country={country}
            positionZ={-130 - Math.random() * 90}
            key={`ballBG2${index}`}
            setCurrentCountry={setCurrentCountry}
          />
        );
      })}
    </>
  );
};

export default BallsBackground;
