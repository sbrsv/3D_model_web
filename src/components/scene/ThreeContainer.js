import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import {
    createScene,
    createCamera,
    createRenderer,
    createLights,
    setupControls,
    setupAnimationLoop,
    handleResize
} from './Three.Service';

const ThreeContainer = ({ loadedModel }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!loadedModel) return;
        const scene = createScene();
        const camera = createCamera();
        const renderer = createRenderer();
        mountRef.current.appendChild(renderer.domElement);

        createLights(scene);
        scene.add(loadedModel);
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
    }, [loadedModel]);

    return <div ref={mountRef} />;
};

export default ThreeContainer;
