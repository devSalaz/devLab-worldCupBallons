import React from "react";
import {
  EffectComposer,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";

const Effect = () => {
  return (
    <>
      <EffectComposer>
        <Vignette offset={0.3} darkness={0.65} />
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.35}
          bokehScale={4.5}
        />
      </EffectComposer>
    </>
  );
};

export default Effect;
