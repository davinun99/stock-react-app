import React, { useEffect, useState } from 'react'
import apiCall, {mockingData} from '../../utils/apiUtils';

const PortfolioGraph = ({assets}) => {
    const [dataToDisplay, setDataToDisplay] = useState(null);

    useEffect(() => {
        const getData = async() => {
            let total = 0;
            for (let i = 0; i < assets.length; i++) {
                try {
                    const result = await apiCall(assets[i].symbol, false);
                    const stock = result;
                    if( typeof stock.timeSeries['Time Series (Daily)'] === 'object' ){
                        const dividedData = Object.entries( stock.timeSeries['Time Series (Daily)'] );
                        const dataForDates = dividedData.map(elmt => elmt[1]['4. close']);
                        total += dataForDates[0] * assets[i].amount;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            const totalInvested = assets.reduce( (sum, it) => (sum + it.price), 0 );
            const daysPass = Math.abs( new Date() - assets[0].dateBought ) / 1000 / 60 / 60 / 24 ;
            const currentGrowthPerDay = (total - totalInvested)/daysPass;
            const obj = {
                currentAmount: total,
                totalInvested: totalInvested,
                growthRate: (total - totalInvested)/total,
                daysPass: parseInt(daysPass),
                gainsTillToday: total - totalInvested,
                sixMonthGrowth: currentGrowthPerDay * 180,
                sixMonthGrowthPercent: (currentGrowthPerDay * 180 + total - totalInvested)/total,
                oneYearGrowth: currentGrowthPerDay * 365,
                oneYearGrowthPercent: (currentGrowthPerDay * 365 + total - totalInvested)/total,
            }
            setDataToDisplay(obj);
        }
        getData();
    }, []);
    
    if(dataToDisplay)
        return(
            <div className="container mt-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-10 col-md-6">
                        <div className="shadow p-3 mb-5 bg-white rounded">
                            <h5 className="text-center">Current portfolio</h5>
                            
                            <div className="mt-3">
                                <p className=""><b>Current total:</b> {dataToDisplay.currentAmount.toFixed(2)}$</p>
                                <p>Started in {assets[0].dateBought.toLocaleDateString()} with {dataToDisplay.totalInvested}$</p>
                                <p>Growth {dataToDisplay.growthRate.toFixed(2)} % in {dataToDisplay.daysPass} days</p>
                                <p>Gains untill today: {dataToDisplay.gainsTillToday.toFixed(2)}$</p>
                                <p>Gains in six months: {dataToDisplay.sixMonthGrowth.toFixed(2)}$ ({dataToDisplay.sixMonthGrowthPercent.toFixed(2)}%)</p>
                                <p>Gains in one year: {dataToDisplay.oneYearGrowth.toFixed(2)}$ ({dataToDisplay.oneYearGrowthPercent.toFixed(2)}%)</p>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        );
    else return (<p>Loading...</p>)

}
export default PortfolioGraph;
