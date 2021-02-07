import React from 'react'

const ShowMoreData = ({stockData}) => {
    const dividedData = Object.entries( stockData.timeSeries['Time Series (Daily)'] );
    const dates = dividedData.map(elmt => elmt[0]).reverse();
    const dataForDates = dividedData.map(elmt => elmt[1]['2. high']).reverse();
    const startedDate = new Date(dates[0]);
    const initialValue = parseInt(dataForDates[0]);
    const finalValue = parseInt(dataForDates[ dataForDates.length - 1]);
    const growth = (finalValue - initialValue) / initialValue * 100;
    const timePass = Math.abs( new Date(dates[dates.length -1]) - new Date(dates[0]) ) / 1000 / 60 / 60 / 24 ;
    const name = typeof stockData.companyData.Name !== 'undefined' ? stockData.companyData.Name : stockData.timeSeries['Meta Data']['2. Symbol'];
    return(
        <div className="row mt-3">
            <div className="col-12">
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <h5 className="text-center">Relevant data for { name }</h5>
                    <div className="mt-3">
                        <p>From {initialValue}$ to {finalValue}$</p>
                        <p>Growth of {growth.toFixed(1)} % in {dates.length} days since {startedDate.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ShowMoreData;