import React from 'react';
import PortfolioGraph from './PortfolioGraph';
const MainPortfolio = () => {
    const assets = [
        {symbol: 'IVV', dateBought: new Date('2021-01-25 09:00'), amount: 0.051558, price: 20 },
        {symbol: 'AAPL', dateBought: new Date('2021-02-01 09:00'), amount: 0.15016, price: 20 },
        {symbol: 'IWM', dateBought: new Date('2021-04-26 09:00'), amount: 0.0871, price: 20 }
    ];
    return(
        <>
            <div className="container">
            </div>
            <PortfolioGraph assets={assets}/>
        </>
    );
}
export default MainPortfolio;
