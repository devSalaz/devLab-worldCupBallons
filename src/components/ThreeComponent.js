import React, { useEffect } from "react";
import { Physics, Attractor } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import Lighting from "./Lighting";
import BallsRain from "./BallsRain";
import Player from "./Player";
import Platform from "./Platform";
import CursorBall from "./CursorBall";
import SceneTV from "./SceneTV";
import Effect from "./Effect";
import BallsBackground from "./BallsBackground";

const ThreeComponent = ({
  countriesState,
  currentCountry,
  setCurrentCountry,
  isTeamChoosed,
  setTeamChoosed,
  showScene,
  teamSelected,
  setTeamSelected,
}) => {
  useFrame((state) => {
    state.camera.position.set(0, 1.5, 25);

    if (showScene) {
      state.camera.lookAt(new THREE.Vector3(0, 1.5, 0));
    }
  });

  const { scene } = useThree();

  useEffect(() => {
    const colorBackground = `0x${currentCountry.backgroundColor.replace(
      "#",
      ""
    )}`;
    const colorToAnim = new THREE.Color().setHex(colorBackground);
    gsap.to(scene.background, {
      duration: 0.6,
      r: colorToAnim.r,
      g: colorToAnim.g,
      b: colorToAnim.b,
      ease: "linear",
    });
  }, [currentCountry]);
  return (
    <>
      <Effect />
      <Lighting currentCountry={currentCountry} />
      <Physics gravity={[0, -9.8, 0]}>
        <Attractor
          range={50}
          strength={5}
          type="static"
          position={[0, 1, -60]}
        ></Attractor>
        <BallsRain
          countriesState={countriesState}
          currentCountry={currentCountry}
        />
        <CursorBall />
        <Platform currentCountry={currentCountry} />
        <Player currentCountry={currentCountry} />
        <BallsBackground
          countriesState={countriesState}
          setCurrentCountry={setCurrentCountry}
        />
        {!showScene && (
          <SceneTV
            countriesState={countriesState}
            setCurrentCountry={setCurrentCountry}
            isTeamChoosed={isTeamChoosed}
            setTeamChoosed={setTeamChoosed}
            showScene={showScene}
            currentCountry={currentCountry}
            teamSelected={teamSelected}
            setTeamSelected={setTeamSelected}
          />
        )}
      </Physics>
    </>
  );
};

export default ThreeComponent;
