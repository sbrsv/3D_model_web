import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import {
    createScene,
    createCamera,
    createRenderer,
    createLights,
    addCube,
    setupControls,
    setupAnimationLoop,
    handleResize
} from './Three.Service';

const ThreeContainer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = createScene();
        const camera = createCamera();
        const renderer = createRenderer();
        mountRef.current.appendChild(renderer.domElement);

        createLights(scene);
        addCube(scene);

        setupControls(camera, renderer);

        let cube = scene.children.find(obj => obj instanceof THREE.Mesh);
        setupAnimationLoop(scene, camera, renderer, () => {
            if (cube) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }
        });

        window.addEventListener('resize', () => handleResize(renderer, camera));

        // Clean up on unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', () => handleResize(renderer, camera));
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeContainer;
