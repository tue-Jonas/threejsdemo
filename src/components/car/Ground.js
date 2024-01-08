import React, {useEffect} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {MeshReflectorMaterial} from "@react-three/drei";
import {LinearEncoding, RepeatWrapping, TextureLoader} from "three";

const texturePaths = [
    "/models/car/terrain-roughness.jpg",
    "/models/car/terrain-normal.jpg"
];

export function Ground() {
    const [roughness, normal] = useLoader(TextureLoader, texturePaths.map(path => process.env.PUBLIC_URL + path));

    useEffect(() => {
        const textures = [normal, roughness];
        textures.forEach(texture => {
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.repeat.set(5, 5);
            texture.offset.set(0, 0);
        });

        normal.encoding = LinearEncoding;
    }, [normal, roughness]);

    useFrame(({clock}) => {
        const timeOffset = -clock.getElapsedTime() * 0.128 % 1;
        roughness.offset.set(0, timeOffset);
        normal.offset.set(0, timeOffset);
    });

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[30, 30]}/>
            <MeshReflectorMaterial
                envMapIntensity={0}
                normalMap={normal}
                normalScale={[0.15, 0.15]}
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    );
}
