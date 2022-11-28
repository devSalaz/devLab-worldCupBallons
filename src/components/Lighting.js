import React from "react";
import { Environment } from "@react-three/drei";

const Lighting = ({ currentCountry }) => {
  return (
    <>
      <Environment files="./hdris/adams_place_bridge_1k.hdr" resolution={32} />
      <ambientLight color={currentCountry.ambientLightColor} intensity={0.5} />
      <directionalLight
        position-x={50}
        position-y={10}
        position-z={10}
        color={currentCountry.primaryLightColor}
        intensity={1.8}
        lookAt={[0, 1, -60]}
      />
      <spotLight
        position-x={-50}
        position-y={10}
        position-z={-30}
        color={currentCountry.secondaryLightColor}
        intensity={1.5}
        lookAt={[0, 1, -60]}
        penumbra={0.5}
        angle={1.57}
      />
    </>
  );
};

export default Lighting;
