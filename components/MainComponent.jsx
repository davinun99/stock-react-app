import React from 'react'
import CanvasContainers from './CanvasContainers';


const MainComponent = () => {
    const symbols = ['AAPL', 'IVV'];
    return(
        <>
            <CanvasContainers symbols={symbols}/>
        </>
    );
}
export default MainComponent;