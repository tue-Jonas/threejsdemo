import React, {useEffect, useRef} from "react";
import * as THREE from "three";

const Heightmap = () => {
    const mountRef = useRef(null);

    let width;
    let height;
    let scene;
    let camera;
    let renderer;
    let heightmap;

    const generateTerrain = (data) => {
        console.log(data)

        const canvas = document.createElement('canvas');
        canvas.width = data.image.width;
        canvas.height = data.image.height;

        const context = canvas.getContext('2d');
        context.drawImage(data.image, 0, 0, data.image.width, data.image.height);

        const imageData = context.getImageData(0, 0, data.image.width, data.image.height);

        console.log(imageData);

        const vertices = [];
        const indices = [];
        const colors = [[1.0, 0.6, 0.8]];

        for (let z = 0; z < imageData.height; z++) {
            for (let x = 0; x < imageData.width; x++) {
                vertices.push(x);
                vertices.push(imageData.data[x + z * imageData.width]);
                vertices.push(z);
            }
        }

        indices.push(0);
        indices.push(32);
        indices.push(0 + 1);

        indices.push(0 + 1);
        indices.push(32);
        indices.push(32 + 1);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial();
        material.wireframe = true;
        material.vertexColors = true;
        heightmap = new THREE.Mesh(geometry, material);
        scene.add(heightmap);
    }

    // Render loop
    const animate = (total) => {
        // console.log(total);
        requestAnimationFrame((total) => animate(total));

        // Rotate the heightmap
        // heightmap.rotation.x += 0.01;
        // heightmap.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    useEffect(() => {
        // Setup scene, camera, and renderer
        width = mountRef.current.clientWidth;
        height = mountRef.current.clientHeight;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({antialias: true});

        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        loader.load("/heightmap.png", (data) => {
            generateTerrain(data)
        })

        camera.position.z = 5;

        animate();
    }, []);

    return <div ref={mountRef} style={{width: "100vw", height: "100vh", overflow: "hidden"}}/>;
}

export default Heightmap;