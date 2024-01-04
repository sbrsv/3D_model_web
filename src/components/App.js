import React, { useState } from 'react';
import ThreeContainer from './scene/ThreeContainer';
import UIPanel from "./panels/UIPanel";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
    const [scene, setScene] = useState();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => loadModel(reader.result);
    };

    const loadModel = (arrayBuffer) => {
        const loader = new GLTFLoader();
        loader.parse(arrayBuffer, '', (gltf) => {
            setScene(gltf.scene);
        });
    };

    return (
        <div style={appStyle}>
            <UIPanel onFileUpload={handleFileUpload} />
            <ThreeContainer loadedModel={scene}/>
        </div>
    );
}

const appStyle = {
    display: 'flex',
    height: '100vh'
};


export default App;
