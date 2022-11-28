import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";

const BallBackground = ({ country, positionZ, setCurrentCountry }) => {
  const textureFlag = useTexture(`./flags/${country.flagUrl}.png`);
  const normalMap = useTexture("./normals/tela.jpg");
  const { nodes } = useGLTF("./models/sphere.glb");
  const { viewport, camera } = useThree();
  const [dataPosZ] = useState({ value: -110 - Math.random() * 90 });
  const { width, height } = viewport.getCurrentViewport(camera, [
    0,
    0,
    dataPosZ.value,
  ]);

  const [ballPosData] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height * 2),
    z: dataPosZ.value,
    directionrotX: Math.random() < 0.5 ? 1 : -1,
    directionrotY: Math.random() < 0.5 ? 1 : -1,
    speedRot: Math.random(),
  });

  const ballRef = useRef(null);
  useFrame((state, delta) => {
    ballRef.current.position.set(
      ballPosData.x * width,
      (ballPosData.y += delta),
      ballPosData.z
    );

    ballRef.current.rotation.y +=
      (delta / 2) * ballPosData.directionrotY * ballPosData.speedRot;
    ballRef.current.rotation.x +=
      (delta / 2) * ballPosData.directionrotX * ballPosData.speedRot;

    if (ballPosData.y > height) {
      ballPosData.y = -height;
      ballPosData.x = THREE.MathUtils.randFloatSpread(2);
      ballPosData.z = -110 - Math.random() * 90;
    }
  });

  return (
    <>
      <mesh
        scale={2}
        rotation-z={Math.PI}
        ref={ballRef}
        position={[0, 0, positionZ]}
        geometry={nodes.Sphere.geometry}
        onClick={() => {
          setCurrentCountry(country);
        }}
      >
        <meshPhysicalMaterial
          color={"#ffffff"}
          normalMap={normalMap}
          map={textureFlag}
          roughness={0.35}
        />
      </mesh>
    </>
  );
};

export default BallBackground;
