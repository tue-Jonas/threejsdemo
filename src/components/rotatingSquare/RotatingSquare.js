import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';

const RotatingSquare = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Setup scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Create a geometry and a material then combine them into a mesh
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: 0x0099ff});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on unmount
        return () => {
            geometry.dispose();
            material.dispose();
            if (mountRef.current) { // Check if mountRef.current is not null
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();  // This will also dispose of the scene and camera
        };
    }, []);

    return <div ref={mountRef} style={{width: "100vw", height: "100vh"}}/>;
};

export default RotatingSquare;
