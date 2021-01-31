//File for handling API Calls to alphavantage.co
// both functions recieve the symbol to be queried... 

//FINAL CONSTANT
const apiKey = 'OBGOGP4LNRC54O4U';

const apiCall = async (symbol) => {
    //Call the API and save the response in localStorage to use the mock
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const apiCompanyUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const objRes = await response.json();
    
    const responseCo = await fetch(apiCompanyUrl);
    const objResCo = await responseCo.json();
    if (typeof window !== "undefined") {
        localStorage.setItem(symbol + 'Data', JSON.stringify(objRes));
        localStorage.setItem(symbol + 'Co', JSON.stringify(objResCo));
    }
    return {
        timeSeries: objRes, 
        companyData: objResCo
    }

}
export const mockingData = (symbol) => {
    //Now just working with localStorage data to not charge the API
    if (typeof window !== "undefined") {
        return {
            timeSeries:  JSON.parse( localStorage.getItem(symbol + 'Data') ), 
            companyData: JSON.parse( localStorage.getItem(symbol + 'Co')   )
        };
    }else return {};
}
export default apiCall;