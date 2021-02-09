import React from 'react'
import CanvasContainers from './CanvasContainers';


const MainComponent = () => {
    //const symbols = ['AAPL', 'IVV'];
    const symbols = ['TSLA','AMZN','AAPL', 'GOOGL', 'ADBE','AMD', 'T', 'BABA', 'BA', 'CSCO', 'DIS', 'FB', 'JNJ', 'MA', 'MSFT', 'MU', 'NFLX', 'NVDA', 'PG', 'ROKU', 'SPY', 'V', 'QQQ', 'IWM', 'GDX', 'EEM', 'EFA', 'TLT', 'XLF', 'GLD', 'UNH', 'DHR', 'JPM', 'HYG']
    return(
        <>
            <CanvasContainers symbols={symbols}/>
        </>
    );
}
export default MainComponent;