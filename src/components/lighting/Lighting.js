import React, {useEffect, useRef} from 'react';
import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    DirectionalLight,
    DirectionalLightHelper,
    GridHelper,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    SphereGeometry,
    WebGLRenderer
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const Lighting = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(3, 3, 3);

        const renderer = new WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        const controls = new OrbitControls(camera, canvasRef.current);

        // Helpers
        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);
        const gridHelper = new GridHelper(20);
        scene.add(gridHelper);

        // Box
        const boxGeometry = new BoxGeometry();
        const boxMaterial = new MeshStandardMaterial({color: 0x00ff00});
        const box = new Mesh(boxGeometry, boxMaterial);
        scene.add(box);

        // Plane
        const planeGeometry = new PlaneGeometry(15, 15);
        const planeMaterial = new MeshStandardMaterial({color: 0xffffff});
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);

        // Sphere
        const sphereGeometry = new SphereGeometry();
        const sphereMaterial = new MeshStandardMaterial({color: 0xff0000});
        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(3, 2, 0);
        sphere.castShadow = true;
        scene.add(sphere);

        // Lights
        const ambientLight = new AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-10, 17, 0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        scene.add(new DirectionalLightHelper(directionalLight));

        // Animation loop
        const animate = (delay) => {
            requestAnimationFrame((delay) => animate(delay));

            sphere.position.y = Math.sin(delay / 1000) + 2;

            controls.update();
            renderer.render(scene, camera);
        };
        animate(0);

        // Clean up
        return () => {
            controls.dispose();
            renderer.dispose();
            scene.clear();

            // Dispose geometries and materials
            boxGeometry.dispose();
            boxMaterial.dispose();
            planeGeometry.dispose();
            planeMaterial.dispose();
            sphereGeometry.dispose();
            sphereMaterial.dispose();
        };
    }, []);

    return <div style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <canvas ref={canvasRef}/>
    </div>;
};

export default Lighting;
