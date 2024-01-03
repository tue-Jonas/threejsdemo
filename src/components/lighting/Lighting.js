import React, {useEffect, useRef} from 'react';
import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    CameraHelper,
    DirectionalLight,
    GridHelper,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    SphereGeometry,
    WebGLRenderer
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

const Lighting = () => {
    const canvasRef = useRef(null);
    const guiRef = useRef(null);
    const optionsRef = useRef({
        wireframeOfSphere: false,
        colorOfSphere: 0xff0000,
        speedOfSphere: 0.5
    });

    useEffect(() => {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(10, 10, 10);

        const renderer = new WebGLRenderer({canvas: canvasRef.current});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        const controls = new OrbitControls(camera, canvasRef.current);

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);
        const gridHelper = new GridHelper(20);
        scene.add(gridHelper);

        const boxGeometry = new BoxGeometry();
        const boxMaterial = new MeshPhongMaterial({color: 0x00ff00});
        const box = new Mesh(boxGeometry, boxMaterial);
        scene.add(box);

        const planeGeometry = new PlaneGeometry(15, 15);
        const planeMaterial = new MeshPhongMaterial({color: 0xffffff});
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);

        const sphereGeometry = new SphereGeometry();
        const sphereMaterial = new MeshPhongMaterial({color: optionsRef.current.colorOfSphere});
        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(3, 2, 0);
        sphere.castShadow = true;
        scene.add(sphere);

        const ambientLight = new AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-10, 17, 0);
        directionalLight.castShadow = true;

        // Adjust the frustum of the shadow camera
        const shadowCamera = directionalLight.shadow.camera;
        shadowCamera.top = 6;

        // Update the shadow camera projection matrix
        shadowCamera.updateProjectionMatrix();

        scene.add(directionalLight);
        const cameraHelper = new CameraHelper(shadowCamera);
        scene.add(cameraHelper);

        guiRef.current = new GUI();
        guiRef.current.add(optionsRef.current, 'wireframeOfSphere')
            .onChange((value) => sphere.material.wireframe = value);
        guiRef.current.addColor(optionsRef.current, 'colorOfSphere')
            .onChange((color) => sphere.material.color.set(color));
        guiRef.current.add(optionsRef.current, 'speedOfSphere', 0, 5);

        const animate = (delay) => {
            requestAnimationFrame((delay) => animate(delay));

            sphere.position.y = Math.sin(delay / 1000 * optionsRef.current.speedOfSphere) + 2;

            controls.update();
            renderer.render(scene, camera);
        };
        animate(0);

        return () => {
            controls.dispose();
            renderer.dispose();
            scene.clear();
            guiRef.current.destroy();

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