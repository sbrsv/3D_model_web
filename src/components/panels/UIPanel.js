import React from 'react';

const UIPanel = ({ onFileUpload }) => {
    return (
        <div style={panelStyle}>
            <h3 style={titleStyle}>Control Panel</h3>
            <input
                type="file"
                onChange={onFileUpload}
                style={fileInputStyle}
                multiple
                accept=".glb,.gltf"
            />
        </div>
    );
};

const panelStyle = {
    minWidth: '200px',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    boxSizing: 'border-box'
};

const titleStyle = {
    margin: '0 0 20px 0'
};

const fileInputStyle = {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box'
};

export default UIPanel;
