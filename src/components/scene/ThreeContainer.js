import React, { useRef, useEffect } from 'react';
import {
    createScene,
    createCamera,
    createRenderer,
    createLights,
    setupControls,
    handleResize
} from './Three.Service';

const ThreeContainer = ({ loadedModel, setScene, setCamera }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!loadedModel || !mountRef.current) return;

        const newScene = createScene();
        const newCamera = createCamera();
        const renderer = createRenderer();
        mountRef.current.appendChild(renderer.domElement);

        createLights(newScene);
        newScene.add(loadedModel);
        setupControls(newCamera, renderer);

        setScene(newScene);
        setCamera(newCamera);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(newScene, newCamera);
        };

        animate();

        window.addEventListener('resize', () => handleResize(renderer, newCamera));

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', () => handleResize(renderer, newCamera));
        };
    }, [loadedModel, setScene, setCamera]);

    return (
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    );
};

export default ThreeContainer;
