import React, { useEffect, useState } from 'react'
import apiCall, {mockingData} from '../utils/apiUtils';
import {genOldToNewLine, genCurrentPriceLine} from '../utils/graphUtils';
import {Line} from 'react-chartjs-2';
import ShowMoreData from './ShowMoreData';
const CanvasContainer = ({symbol}) =>{
    
    const [graphData, setGraphData] = useState(false);
    const [stockData, setStockData] = useState(null);
    useEffect(() => {
        //FIRST GET THE DATA FOR THE STOCK
        const getData = async () => {
            const stockDataAPI = await apiCall(symbol);
            //const stockDataAPI = mockingData(symbol);
            setStockData(stockDataAPI);
            if( typeof stockDataAPI.timeSeries['Time Series (Daily)'] === 'object' ){
                const dividedData = Object.entries( stockDataAPI.timeSeries['Time Series (Daily)'] );
                const labelDates = dividedData.map(elmt => elmt[0]).reverse();
                const dataForDates = dividedData.map(elmt => elmt[1]['2. high']).reverse();
                const name = stockDataAPI && typeof stockDataAPI.companyData.Name !== 'undefined' ? stockDataAPI.companyData.Name : stockDataAPI.timeSeries['Meta Data']['2. Symbol'];
                setGraphData({
                    labels: labelDates,
                    datasets: [
                        {
                            type: 'line',
                            pointRadius: 0,
                            fill: false,
                            lineTension: 0,
                            borderWidth: 2,
                            label: name,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            hoverBackgroundColor: "rgba(255,99,132,0.4)",
                            hoverBorderColor: "rgba(255,99,132,1)",
                            data: dataForDates  
                        },
                        genOldToNewLine(dataForDates),
                        genCurrentPriceLine(dataForDates),
                    ]
                });
            }
        }
        getData();
    }, [])
    
    //THEN GRAPH THE DATA:
    return(
        <div className="col-12 col-md-6">
            { 
                graphData ? (
                    <>
                        <Line data={graphData}/> 
                        <ShowMoreData stockData={stockData}/>
                    </>
                ):
                (<p>Loading...</p>)
            }
        </div>
    );
}
export default CanvasContainer;