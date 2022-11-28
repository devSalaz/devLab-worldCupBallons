import React from "react";
import { Html } from "@react-three/drei";
import { useProgress } from "@react-three/drei";

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html wrapperClass="loading-container">
      <h2>{`Loading ${Math.floor((loaded / total) * 100)}%`}</h2>
    </Html>
  );
};

export default Loader;
