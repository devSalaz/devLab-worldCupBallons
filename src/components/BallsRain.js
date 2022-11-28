import React, { useMemo, useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { InstancedRigidBodies } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import BallMaterial from "../classes/CustomStandarMaterial";
import { sRGBEncoding } from "three";
import gsap from "gsap";

const textureLoader = new THREE.TextureLoader();

const BallsRain = ({ countriesState, currentCountry }) => {
  const { nodes, materials } = useGLTF("./models/sphere.glb");
  const [randomState, setRandomState] = useState(null);
  const { viewport, camera } = useThree();
  const instancedRef = useRef(null);
  const instancedRigidBodiesRef = useRef(null);
  const materialRef = useRef(null);

  const randomPositions = useMemo(() => {
    const randomPositions = [];

    for (let i = 0; i < 32; i++) {
      const positionZ = -150 + i;
      const width = viewport.getCurrentViewport(camera, [
        0,
        0,
        positionZ,
      ]).width;
      const height = viewport.getCurrentViewport(camera, [
        0,
        0,
        positionZ,
      ]).height;

      randomPositions.push([
        THREE.MathUtils.randFloatSpread(width),
        THREE.MathUtils.randFloatSpread(height * 1.5),
        -35,
      ]);
    }

    return randomPositions;
  }, [randomState]);

  useEffect(() => {
    const texture = textureLoader.load(`./flags/${currentCountry.flagUrl}.png`);
    texture.encoding = sRGBEncoding;

    materialRef.current.uniforms.uTexture2.value = texture;

    gsap.to(materialRef.current.uniforms.uValue, {
      duration: 1.0,
      value: 1.0,
      ease: "linear",
      onComplete() {
        materialRef.current.uniforms.uTexture1.value = texture;
        materialRef.current.uniforms.uValue.value = 0;
      },
    });
  }, [currentCountry]);

  return (
    <>
      <group>
        <InstancedRigidBodies
          ref={instancedRigidBodiesRef}
          positions={randomPositions}
          restitution={0.05}
          colliders="ball"
          mass={10}
          gravityScale={0}
        >
          <instancedMesh
            ref={instancedRef}
            args={[nodes.Sphere.geometry, null, 32]}
          >
            <BallMaterial
              ref={materialRef}
              roughness={0.25}
              needsUpdate={true}
            />
          </instancedMesh>
        </InstancedRigidBodies>
      </group>
    </>
  );
};

export default BallsRain;
