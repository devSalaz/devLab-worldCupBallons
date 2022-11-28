import React, { useRef, useState, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, Html, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import messiVideo from "../assets/videos/messiGoalReduced.mp4";
import ChooseTeam from "./ChooseTeam";
import BallsSurprise from "./BallsSurprise";

const SceneTV = ({
  countriesState,
  setCurrentCountry,
  setTeamChoosed,
  showScene,
  currentCountry,
  setTeamSelected,
  teamSelected,
}) => {
  const tvSceneRef = useRef(null);
  const tvBodyRef = useRef(null);
  const rigidBodyRef = useRef(null);
  const [isTVOn, setTVOn] = useState(false);
  const { nodes, materials } = useGLTF("./models/TV.glb");

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = messiVideo;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  useEffect(() => {
    if (teamSelected) {
      setTVOn(false);
      window.setTimeout(function () {
        setTeamChoosed(true);
      }, 4000);
    }
  }, [teamSelected]);

  useFrame((state) => {
    if (!showScene) {
      state.camera.lookAt(tvSceneRef.current.position);
    }

    const vectorPosition = new THREE.Vector3(
      0 + tvBodyRef.current.position.x,
      -8 + tvBodyRef.current.position.y,
      120 + tvBodyRef.current.position.z
    );
    rigidBodyRef.current.setNextKinematicTranslation(vectorPosition);
    const eulerRotation = new THREE.Euler(
      tvBodyRef.current.rotation.x,
      tvBodyRef.current.rotation.y - Math.PI / -1.1,
      tvBodyRef.current.rotation.z
    );
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    rigidBodyRef.current.setNextKinematicRotation(quaternionRotation);
  });

  const onClickedHandler = () => {
    setTVOn(true);
  };

  return (
    <>
      <Float ref={tvBodyRef}></Float>
      <group
        scale={2.5}
        rotation-y={-3.33}
        position={[0, -8, 120]}
        ref={tvSceneRef}
        onClick={onClickedHandler}
      >
        <RigidBody ref={rigidBodyRef} type="kinematicPosition">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TVBody.geometry}
            material={materials.Default}
            scale={0.04}
            onClick={onClickedHandler}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TVScreen.geometry}
              onClick={onClickedHandler}
            >
              <meshBasicMaterial color={"#ffffff"} side={THREE.DoubleSide}>
                <videoTexture attach="map" args={[video]} />
              </meshBasicMaterial>
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TVScreenBg.geometry}
              material={materials.Default.clone()}
              material-transparent={true}
              material-opacity={0.85}
              onClick={onClickedHandler}
            >
              <Html
                transform
                className={`htmlElement ${isTVOn ? "show" : ""}`}
                distanceFactor={15}
                position-y={0}
                position-z={23}
              >
                <ChooseTeam
                  countriesState={countriesState}
                  setCurrentCountry={setCurrentCountry}
                  setTeamSelected={setTeamSelected}
                />
              </Html>
            </mesh>
          </mesh>
        </RigidBody>
        <BallsSurprise
          currentCountry={currentCountry}
          teamSelected={teamSelected}
        />
      </group>
    </>
  );
};

export default SceneTV;
