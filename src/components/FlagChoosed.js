import React from "react";

const FlagChoosed = ({ flag, setCurrentCountry, setTeamSelected }) => {
  return (
    <>
      <div
        className="flag"
        style={{
          backgroundImage: `url("./flags/${flag.flagUrl}.png")`,
        }}
        onClick={() => {
          setCurrentCountry(flag);
          setTeamSelected(true);
        }}
      ></div>
    </>
  );
};

export default FlagChoosed;
