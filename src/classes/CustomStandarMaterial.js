import * as THREE from "three";
import { forwardRef } from "react";
import { extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load(`./flags/argentinaFlag.png`);
texture1.encoding = THREE.sRGBEncoding;
const texture2 = textureLoader.load(`./flags/brazilFlag.png`);
texture2.encoding = THREE.sRGBEncoding;

class CustomStandarMaterial extends THREE.MeshPhysicalMaterial {
  constructor(args) {
    super(args);

    this.uniforms = {
      uValue: { value: 0.0 },
      uTexture1: { value: texture1 },
      uTexture2: { value: texture2 },
    };

    this.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.uniforms,
      };

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
        
        varying vec2 vUv;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "vViewPosition = - mvPosition.xyz;",
        `vViewPosition = - mvPosition.xyz;
        vUv = uv;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform float uValue;
        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        varying vec2 vUv;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `vec4 textureColor1 = texture2D(uTexture1, vUv);
        vec4 textureColor2 = texture2D(uTexture2, vUv);
        vec4 mixedColor = mix(textureColor1, textureColor2, uValue);
        vec4 diffuseColor = vec4( mixedColor.rgb, opacity );`
      );
    };

    Object.keys(this.uniforms).forEach((name) =>
      Object.defineProperty(this, name, {
        get: () => this.uniforms[name].value,
        set: (v) => (this.uniforms[name].value = v),
      })
    );
  }
}

extend({ BallCustomMaterial: CustomStandarMaterial });

export default forwardRef(function MeshPaintCustomMaterial(props, ref) {
  return <ballCustomMaterial ref={ref} {...props} />;
});
