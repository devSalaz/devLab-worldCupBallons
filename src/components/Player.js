import React, { useRef, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import gsap from "gsap";
import * as THREE from "three";

const Player = ({ currentCountry }) => {
  const playerRef = useRef(null);
  const materialShirtRef = useRef(null);
  const materialHairRef = useRef(null);
  const materialShortsRef = useRef(null);
  const materialSocksRef = useRef(null);
  const materialTennisRef = useRef(null);
  const materialSkinRef = useRef(null);
  const materialShirtDetailsRef = useRef(null);
  const shirtNumberMaterial = useRef(null);

  const animationDuration = 0.6;

  useEffect(() => {
    animateElement(materialShirtRef, "shirtColor");
    animateElement(materialHairRef, "hairColor");
    animateElement(materialShirtDetailsRef, "shirtDetailsColor");
    animateElement(materialShortsRef, "shortsColor");
    animateElement(materialSocksRef, "socksColor");
    animateElement(materialTennisRef, "tennisColor");
    animateElement(materialSkinRef, "skinColor");
    const textColor = currentCountry["textColor"];
    gsap.to(shirtNumberMaterial.current, {
      duration: animationDuration,
      color: textColor,
      ease: "linear",
    });
  }, [currentCountry]);

  const animateElement = (elementMaterial, propertie) => {
    const colorLight = `0x${currentCountry[propertie].replace("#", "")}`;
    const colorToAnim = new THREE.Color().setHex(colorLight);
    gsap.to(elementMaterial.current.color, {
      duration: animationDuration,
      r: colorToAnim.r,
      g: colorToAnim.g,
      b: colorToAnim.b,
      ease: "linear",
    });
  };

  const { nodes, materials } = useGLTF("./models/player.glb");
  return (
    <>
      <group
        ref={playerRef}
        scale={0.4}
        position={[0, -1, -26]}
        rotation-y={Math.PI}
      >
        <RigidBody type="fixed" colliders={false}>
          <CapsuleCollider args={[0.5, 1.6, 1]} position={[0.3, 2, 0]} />
          <mesh
            geometry={nodes.Shirt_ShirtMaterial.geometry}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              ref={materialShirtRef}
              color={"#ffffff"}
              roughness={0.5}
              needsUpdate={true}
            />
          </mesh>
          <mesh
            geometry={nodes.Socks_SocksMaterial.geometry}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              ref={materialSocksRef}
              color={currentCountry.socksColor}
              roughness={0.5}
            />
          </mesh>
          <mesh
            geometry={nodes.Skin_SkinMaterial.geometry}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={currentCountry.skinColor}
              ref={materialSkinRef}
              roughness={0.5}
            />
          </mesh>
          <mesh
            geometry={nodes.TennisDetails_TennisDetailsMaterial.geometry}
            material={materials["Material_43.001"]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={currentCountry.tennisDetailsColor}
              roughness={0}
              metalness={1}
            />
          </mesh>
          <mesh
            geometry={nodes.Tennis_TennisMaterial.geometry}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              ref={materialTennisRef}
              color={currentCountry.tennisColor}
              roughness={0.5}
            />
          </mesh>
          <mesh
            geometry={
              nodes.ShirtDetails_ShirtDetails_ShirtDetailsMaterial.geometry
            }
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={currentCountry.shirtDetailsColor}
              roughness={0.5}
              ref={materialShirtDetailsRef}
            />
          </mesh>
          <mesh
            geometry={nodes.Shorts_ShortsMaterial.geometry}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              ref={materialShortsRef}
              color={currentCountry.shortsColor}
              roughness={0.5}
            />
          </mesh>
          <mesh
            geometry={nodes.Hair_HairMaterial.geometry}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={"#ffffff"}
              roughness={0.25}
              ref={materialHairRef}
            />
          </mesh>
        </RigidBody>
        <Text
          font="./fonts/BebasNeue-Regular.woff"
          position={[0.42, 2.15, -1]}
          fontSize={0.55}
          rotation-y={Math.PI}
          rotation-z={0.05}
          ref={shirtNumberMaterial}
        >
          {currentCountry.textNumber}
        </Text>
      </group>
    </>
  );
};

export default Player;
