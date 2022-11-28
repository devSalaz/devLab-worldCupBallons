import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import FlagChoosed from "./FlagChoosed";

const ChooseTeam = ({ countriesState, setCurrentCountry, setTeamSelected }) => {
  return (
    <>
      <div className="firstContainer">
        <h3>Scroll down to choose your team :D</h3>
        <AiOutlineArrowDown className="icon" size="5rem" />
      </div>
      <div className="secondContainer">
        {countriesState.map((flag, index) => {
          return (
            <FlagChoosed
              key={`${index}FlagOnTv`}
              flag={flag}
              setCurrentCountry={setCurrentCountry}
              setTeamSelected={setTeamSelected}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChooseTeam;
