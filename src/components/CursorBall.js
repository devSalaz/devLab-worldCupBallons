import React, { useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const CursorBall = () => {
  const { nodes, materials } = useGLTF("./models/ballFootball.glb");
  const cursorBall = useRef(null);

  useFrame((state) => {
    cursorBall.current.setNextKinematicTranslation({
      x: state.mouse.x * 8.8 + 0,
      y: state.mouse.y * 5 + 1.5,
      z: -60,
    });
  });

  return (
    <>
      <RigidBody
        type="kinematicPosition"
        mass={2}
        ref={cursorBall}
        colliders="ball"
      >
        <group scale={1.5}>
          <mesh
            geometry={nodes.FootballBall_White_0.geometry}
            material={materials.White}
            material-roughness={0.5}
          />
          <mesh
            geometry={nodes.FootballBall_Black_0.geometry}
            material={materials.Black}
            material-roughness={0.5}
          />
        </group>
      </RigidBody>
    </>
  );
};

export default CursorBall;
