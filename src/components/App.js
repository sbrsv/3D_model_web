import React, {useState} from 'react';
import ThreeContainer from './scene/ThreeContainer';
import UIPanel from "./panels/UIPanel";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ModelTree from "./panels/ModelTree";
import * as THREE from "three";

function App() {
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [sceneUpload, setSceneUpload] = useState();
    const [parts, setParts] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => loadModel(reader.result);
    };
    const processObject = (object, parent = null) => {
        if (object.isMesh) return null;

        const part = {
            id: object.uuid,
            name: object.name || 'Unnamed object',
            type: object.type,
            children: [],
            parent: parent ? parent.id : null,
        };

        object.children.forEach((child) => {
            const process = processObject(child, part)
            if (process) {
                part.children.push(process);
            }
        });

        return part;
    };

    const handleToggleVisibility = (partId, isVisible) => {
        if (scene) {
            const object = scene.getObjectByProperty('uuid', partId);
            if (object) {
                object.visible = isVisible;
            }
        }
    };

    const handleZoom = (partId) => {
        if (scene && camera) {
            const object = scene.getObjectByProperty('uuid', partId);
            if (object) {
                const box = new THREE.Box3().setFromObject(object);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const cameraZ = maxDim * 2; // Adjust this value as needed

                camera.position.set(center.x, center.y, cameraZ);
                camera.lookAt(center);
            }
        }
    };

    const loadModel = (arrayBuffer) => {
        const loader = new GLTFLoader();
        loader.parse(arrayBuffer, '', (gltf) => {
            setSceneUpload(gltf.scene);
            const partsHierarchy = processObject(gltf.scene);
            setParts(partsHierarchy.children)
        });
    };

    return (
        <div style={appStyle}>
            <UIPanel style={uiPanelStyle} onFileUpload={handleFileUpload} />
            <div style={sceneContainerStyle}>
                <ThreeContainer
                    loadedModel={sceneUpload}
                    setScene={setScene}
                    setCamera={setCamera}
                    onToggleVisibility={handleToggleVisibility}
                    onZoom={handleZoom} />
            </div>
            <ModelTree parts={parts} onToggleVisibility={handleToggleVisibility} onZoom={handleZoom} />
        </div>
    );
}

const appStyle = {
    position: 'relative',
    display: 'flex',
    height: '100vh',
    overflow: 'hidden'
};

const uiPanelStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10
};

const sceneContainerStyle = {
    flex: 1,
    overflow: 'hidden'
};


export default App;
