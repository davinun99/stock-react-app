import React from 'react'
import CanvasContainer from './CanvasContainer';

const CanvasContainers = ({symbols})=>{
    
    return(
        <div className="container mt-5">
            <div className="row">
                {symbols.map(symbol => (
                    <CanvasContainer key={symbol} symbol={symbol}/>
                ))}
            </div>
        </div>
    );
}
export default CanvasContainers;