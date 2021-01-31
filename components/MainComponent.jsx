import React from 'react'
import CanvasContainers from './CanvasContainers';
import Header from './Header';

const MainComponent = () => {
    const symbols = ['AAPL', 'TSLA'];
    return(
        <>
            <Header/>
            <CanvasContainers symbols={symbols}/>
        </>
    );
}
export default MainComponent;