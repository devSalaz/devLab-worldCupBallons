import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ThreeComponent from "./ThreeComponent";
import Loader from "./Loader";

import "../styles/canvasStyles.css";

const CanvasComponent = ({
  countriesState,
  currentCountry,
  setCurrentCountry,
  isTeamChoosed,
  setTeamChoosed,
  showScene,
  teamSelected,
  setTeamSelected,
}) => {
  return (
    <>
      <div className="canvasContainer">
        <Canvas
          gl={{ alpha: false, antialias: false }}
          camera={{
            fov: 6,
          }}
          shadows={true}
        >
          <color attach="background" args={["#7e1331"]} />

          <Suspense fallback={<Loader />}>
            <ThreeComponent
              countriesState={countriesState}
              currentCountry={currentCountry}
              setCurrentCountry={setCurrentCountry}
              isTeamChoosed={isTeamChoosed}
              setTeamChoosed={setTeamChoosed}
              showScene={showScene}
              teamSelected={teamSelected}
              setTeamSelected={setTeamSelected}
            />
          </Suspense>
          {/* <Loader /> */}
        </Canvas>
      </div>
    </>
  );
};

export default CanvasComponent;
