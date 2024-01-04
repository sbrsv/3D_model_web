import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const PartItem = ({ part, onToggleVisibility, onZoom }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const hasChildren = part.children && part.children.length > 0;

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        onToggleVisibility(part.id, !isVisible);
    };
    const zoom = () => onZoom(part.id);

    return (
        <li style={itemStyle}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                {hasChildren && (isOpen ? <ExpandLessIcon onClick={toggleOpen} /> : <ExpandMoreIcon onClick={toggleOpen} />)}
                <span style={{ marginLeft: '8px', flexGrow: 1 }} onClick={toggleOpen}>
                    {part.name || 'Unnamed Object'}
                </span>
                {isVisible ? <VisibilityIcon onClick={toggleVisibility} /> : <VisibilityOffIcon onClick={toggleVisibility} />}
                <ZoomInIcon onClick={zoom} />
            </div>
            {isOpen && hasChildren && (
                <ul style={{ paddingLeft: '20px' }}>
                    {part.children.map(child => (
                        <PartItem key={child.id} part={child} onToggleVisibility={onToggleVisibility} onZoom={onZoom} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const ModelTree = ({ parts, onToggleVisibility, onZoom }) => {
    return (
        <div style={treeStyle}>
            <h3 style={titleStyle}>Parts Catalog</h3>
            <div style={scrollStyle}>
                <ul style={listStyle}>
                    {parts.map(part => (
                        <PartItem
                            key={part.id}
                            part={part}
                            onToggleVisibility={onToggleVisibility}
                            onZoom={onZoom}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

const treeStyle = {
    width: '300px', // Adjust as needed
    backgroundColor: '#f8f8f8',
    padding: '20px',
    boxSizing: 'border-box'
};

const scrollStyle = {
    maxHeight: 'calc(100vh - 60px)', // Adjust based on your header/title size
    overflowY: 'auto'
};

const titleStyle = {
    margin: '0 0 20px 0'
};

const listStyle = {
    listStyle: 'none',
    padding: '0'
};

const itemStyle = {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#333',
};


export default ModelTree;
