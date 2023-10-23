import React, {useEffect, useRef} from "react";
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

const Normalmap = () => {
    const canvasRef = useRef(null);

    let scene;
    let camera;
    let renderer;

    const animate = () => {
        renderer.render(scene, camera);

        requestAnimationFrame(() => animate());
    };

    const build = async () => {
        scene = new THREE.Scene();

        const light = new THREE.PointLight(0xffffff, 10000);
        light.position.set(0, 0, 100);
        scene.add(light);

        camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 1000);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        const controls = new OrbitControls(camera, canvasRef.current);

        renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        const plane = new THREE.PlaneGeometry(100, 100);

        const material = new THREE.MeshPhongMaterial();
        const textureLoader = new THREE.TextureLoader();
        material.map = await textureLoader.loadAsync("/normalmap/1.png");
        material.normalMap = await textureLoader.loadAsync("/normalmap/1nm.png");
        // material.normalScale.set(2, 2);

        const planeMesh = new THREE.Mesh(plane, material);
        scene.add(planeMesh);

        requestAnimationFrame(() => animate());
    }

    useEffect(() => {
        build();
    }, []);

    return (
        <div style={{width: "100vw", height: "100vh", overflow: "hidden"}}>
            <canvas ref={canvasRef} style={{width: "100%", height: "100%"}}/>
        </div>
    );
};

export default Normalmap;