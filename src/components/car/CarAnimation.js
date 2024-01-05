import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Car} from "./Car";
import Loader from "../Loader";

const CarAnimation = () => {
    return (
        <Canvas className={"vh-100"} shadows>
    <color args={[0, 0, 0]} attach="background"/>

    <OrbitControls
        target={[0, 0.35, 0]}
    />
    <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>

    <Suspense fallback={<Loader />}>
        <Car/>
    </Suspense>

    <ambientLight intensity={1}/>

    <spotLight
        color={[1, 1, 1]}
        intensity={400}
        angle={0.6}
        penumbra={1}
        position={[5, 5, 0]}
    />
    <spotLight
        color={[1, 1, 1]}
        intensity={400}
        angle={0.6}
        penumbra={1}
        position={[-5, 5, 0]}
    />
    <spotLight
        color={[1, 1, 1]}
        intensity={500}
        angle={0.6}
        penumbra={0.5}
        position={[0, 5, -5]}
    />

    {/*<axesHelper args={[5]}/>*/}
    {/*<gridHelper args={[20, 20]}/>*/}
</Canvas>
    );
};

export default CarAnimation;