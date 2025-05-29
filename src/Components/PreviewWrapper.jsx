import React, { useEffect, useState } from 'react';

const PreviewWrapper = ({ children }) => {
    const [mode, setMode] = useState('desktop');

    // ✅ Automatically detect screen size on mount
    useEffect(() => {
        const width = window.innerWidth;
        if (width <= 480) {
            setMode('mobile');
        } else if (width <= 768) {
            setMode('tablet');
        } else {
            setMode('desktop');
        }
    }, []);

    const getWidth = () => {
        switch (mode) {
            case 'mobile':
                return '375px';
            case 'tablet':
                return '768px';
            default:
                return '100%'; // desktop
        }
    };

    return ( <
        div style = {
            { padding: '1rem' }
        } > { /* Manual Mode Switch Buttons */ } <
        div style = {
            { textAlign: 'center', marginBottom: '1rem' }
        } >
        <
        button onClick = {
            () => setMode('desktop')
        }
        style = {
            { margin: '0 0.5rem' }
        } > Desktop < /button> <
        button onClick = {
            () => setMode('tablet')
        }
        style = {
            { margin: '0 0.5rem' }
        } > Tablet < /button> <
        button onClick = {
            () => setMode('mobile')
        }
        style = {
            { margin: '0 0.5rem' }
        } > Mobile < /button> < /
        div >

        { /* Preview Box */ } <
        div style = {
            {
                width: getWidth(),
                margin: 'auto',
                transition: 'width 0.3s ease-in-out',
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
            }
        } > { children } <
        /div> < /
        div >
    );
};

export default PreviewWrapper;