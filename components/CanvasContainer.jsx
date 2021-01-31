import React, { useEffect, useState } from 'react'
import apiCall, {mockingData} from '../utils/apiUtils';
import {Line} from 'react-chartjs-2';

const CanvasContainer = ({symbol}) =>{
    
    const [graphData, setGraphData] = useState(false);
    useEffect(() => {
        //FIRST GET THE DATA FOR THE STOCK
        const getData = async () => {
            const stockData = await apiCall(symbol);
            //const stockData = mockingData(symbol);
            const dividedData = Object.entries( stockData.timeSeries['Time Series (Daily)'] );
            const labelDates = dividedData.map(elmt => elmt[0]).reverse();
            const dataForDates = dividedData.map(elmt => elmt[1]['2. high']).reverse();
            setGraphData({
                labelDates, dataForDates, 
                companyName: stockData.companyData.Name
            });
        }
        getData();
    }, [])
    
    //THEN GRAPH THE DATA:
    const dataForGraph = {
        labels: graphData.labelDates,
        datasets: [
            {
                type: 'line',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
                label: graphData.companyName,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: graphData.dataForDates  
            }
        ]
    }
    return(
        <div className="col-12 col-md-6">
            <Line data={dataForGraph}/>
            <div className="moreData">
            </div>
        </div>
    );
}
export default CanvasContainer;