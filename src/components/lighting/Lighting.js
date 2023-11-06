import React, {useEffect, useRef} from "react";
import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    Color, DirectionalLight, DirectionalLightHelper,
    GridHelper,
    Mesh,
    MeshBasicMaterial, MeshPhongMaterial,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene, SphereGeometry,
    WebGLRenderer
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const Lighting = () => {
    const canvasRef = useRef(null);
    let controls;

    useEffect(() => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(3, 3, 3);

        // Assuming the OrbitControls are correctly imported, they should be attached to the camera and canvas here
        controls = new OrbitControls(camera, canvasRef.current);

        const renderer = new WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth, window.innerHeight);

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);

        const gridHelper = new GridHelper(20);
        scene.add(gridHelper);

        const boxGeometry = new BoxGeometry();
        const boxMaterial = new MeshStandardMaterial({color: Color.NAMES.green});
        const box = new Mesh(boxGeometry, boxMaterial);
        scene.add(box);

        const planeGeometry = new PlaneGeometry(10, 10);
        const planeMaterial = new MeshBasicMaterial({color: Color.NAMES.white});
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -90 * Math.PI / 180
        scene.add(plane)

        const sphereGeometry = new SphereGeometry();
        const sphereMaterial = new MeshPhongMaterial({
            color: Color.NAMES.red,
            specular: Color.NAMES.white
        });
        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 3;
        sphere.position.y = 2;
        scene.add(sphere);

        const ambientLight = new AmbientLight(Color.NAMES.darkgray);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(Color.NAMES.white, 1.0);
        directionalLight.position.set(-10, 17, 0)
        scene.add(directionalLight);

        const directionalLightHelper = new DirectionalLightHelper(directionalLight);
        scene.add(directionalLightHelper);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Only required if controls.enableDamping or controls.autoRotate are set to true
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            controls.dispose();
            renderer.dispose();
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div style={{width: "100vw", height: "100vh", overflow: "hidden"}}>
            <canvas ref={canvasRef}/>
        </div>
    );
};

export default Lighting;
