
//GraphData expect the data for the stock and canvas context 

const genDataset2 = (labelDates, data) => {
    const initialValue = data[0];
    const finalValue = data[data.length - 1];
    const fun = (x, initial, final, n) => initial * (1-x/n) + final * (x/n) ;
    const lineData = data.map( (elmt, i) => fun(i, initialValue, finalValue, data.length) );

    const dataset = {
        type: 'line',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 2,
        label: 'Growth line',
        backgroundColor: 'rgb(0, 99, 132)',
        borderColor: 'rgb(0 , 99, 132)',
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: lineData
    }
    return dataset;
}
const showMoreData = (labelDates, dataForDates, container) => {
    console.log(container.children[1]);
    container.children[1].innerHTML = `Starting price: ${dataForDates[0]} $ <br> Today's price: ${dataForDates[ dataForDates.length - 1 ]} $`;
}
const graphData = async (data, canvasContainer, showLoading) => {
    let objResCo = data.companyData;
    let objRes = data.timeSeries;
    //console.log(objRes['Time Series (Daily)']);
    //Convert map to 2 arrays
    const dividedData = Object.entries( objRes['Time Series (Daily)'] );
    const labelDates = dividedData.map(elmt => elmt[0]).reverse();
    const dataForDates = dividedData.map( elmt => parseFloat(elmt[1]['2. high']) ).reverse();
    const dataset = {
        type: 'line',
        pointRadius: 0,
        fill: false,
        lineTension: 0,
        borderWidth: 2,
        label: objResCo.Name,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataForDates  
    };
    
    //get the canvas element from the container
    let ctx = canvasContainer.children[0].getContext('2d');

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelDates,
            datasets: [
                dataset,
                genDataset2(labelDates, dataForDates),
            ]
        },
        options: {
            responsive: true
        }
    });
    showMoreData(labelDates, dataForDates, canvasContainer);
    showLoading(false);
}

export default graphData;