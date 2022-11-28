import React, { useRef, useEffect } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap, { TimelineMax } from "gsap";

const textureLoader = new THREE.TextureLoader();
const flagWorldTexture = textureLoader.load(`./flagsWorld.png`);

const Platform = ({ currentCountry }) => {
  const textureRef = useRef(null);

  useFrame(() => {
    const currentCenterX = textureRef.current.map.center.x;
    const currentCenterY = textureRef.current.map.center.y;
    textureRef.current.map.center.x = THREE.MathUtils.lerp(
      currentCenterX,
      currentCountry.dataCenterX,
      0.075
    );
    textureRef.current.map.center.y = THREE.MathUtils.lerp(
      currentCenterY,
      currentCountry.dataCenterY,
      0.075
    );
  });

  useEffect(() => {
    const t1 = gsap.timeline({ yoyo: true, ease: "easeOut" });
    t1.to(textureRef.current.map.repeat, {
      duration: 0.75,
      x: 1.0,
      y: 1.0,
      ease: "linear",
    });

    t1.to(textureRef.current.map.repeat, {
      duration: 0.75,
      x: 0.16,
      y: 0.16,
      ease: "linear",
      delay: 0.35,
    });
  }, [currentCountry]);

  return (
    <>
      <mesh
        scale={[3.2, 14, -30]}
        position={[0, -1, -26]}
        rotation={[1.6, 0, 0]}
      >
        <planeGeometry args={[1, 1]}></planeGeometry>
        <MeshReflectorMaterial
          blur={[400, 400]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          depthToBlurRatioBias={0.25}
          minDepthThreshold={0.85}
          roughness={0.1}
          map={flagWorldTexture}
          map-repeat-x={0}
          map-repeat-y={0}
          map-center-x={0}
          color={"#484848"}
          ref={textureRef}
        />
      </mesh>
    </>
  );
};

export default Platform;
