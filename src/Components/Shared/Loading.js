import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="lds-hourglass" />
        </div>
    );
}

export default Loading;
