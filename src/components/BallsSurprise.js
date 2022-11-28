import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { InstancedRigidBodies } from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();

const BallsSurprise = ({ currentCountry, cubesCount = 64, teamSelected }) => {
  const { nodes } = useGLTF("./models/sphere.glb");
  const rigidBodiesRef = useRef(null);

  const cubeTransforms = useMemo(() => {
    const positions = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        55 + (Math.random() - 0.5) * 0.25,
        6 + i * (Math.random() + 5),
        -170 + (Math.random() - 0.5) * 0.25,
      ]);
    }

    return { positions };
  }, []);

  return (
    <>
      {teamSelected && (
        <group position={[0, 0, 0]}>
          <InstancedRigidBodies
            ref={rigidBodiesRef}
            colliders="ball"
            mass={5}
            positions={cubeTransforms.positions}
          >
            <instancedMesh args={[nodes.Sphere.geometry, null, cubesCount]}>
              <meshStandardMaterial
                roughness={0.25}
                transparent={true}
                opacity={1}
                color={"#DEDEDE"}
                map={textureLoader.load(
                  `./flags/${currentCountry.flagUrl}.png`
                )}
              />
            </instancedMesh>
          </InstancedRigidBodies>
        </group>
      )}
    </>
  );
};

export default BallsSurprise;
