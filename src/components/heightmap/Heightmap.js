import React, {useEffect, useRef} from "react";
import * as THREE from "three";

const Heightmap = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        loader.load('heightmap_1.png', (texture) => {
            const canvas = document.createElement('canvas');
            canvas.width = texture.image.width;
            canvas.height = texture.image.height;
            const context = canvas.getContext('2d');
            context.drawImage(texture.image, 0, 0);

            const data = context.getImageData(0, 0, canvas.width, canvas.height);
            generateTerrain(data);
        });

        const generateTerrain = (imageData) => {
            const vertices = [];
            const colors = [];

            for (let i = 0; i < imageData.data.length; i += 4) {
                const x = (i / 4) % imageData.width;
                const z = Math.floor((i / 4) / imageData.width);
                const y = imageData.data[i] / 255 * 10;

                vertices.push(x, y, z);

                // Coloring based on height
                if (y < 5) {
                    colors.push(0, 1, 0, 1); // Green
                } else if (y < 8) {
                    colors.push(0.5, 0.25, 0, 1); // Brown
                } else {
                    colors.push(1, 1, 1, 1); // White
                }
            }

            const indices = [];
            for (let z = 0; z < imageData.height - 1; z++) {
                for (let x = 0; x < imageData.width - 1; x++) {
                    const i = x + z * imageData.width;

                    indices.push(i, i + imageData.width, i + 1);
                    indices.push(i + 1, i + imageData.width, i + imageData.width + 1);
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setIndex(indices);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

            const material = new THREE.MeshBasicMaterial({vertexColors: true, wireframe: true});
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            camera.position.set(-imageData.width / 2, imageData.height, -imageData.height / 2);
            camera.lookAt(imageData.width / 2, 0, imageData.height / 2);

            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
            animate();
        };
    }, []);

    return <div ref={mountRef} style={{width: "100vw", height: "100vh", overflow: "hidden"}}/>;
};

export default Heightmap;
