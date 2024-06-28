const apiKey = 'WCH8EC3ECIOS0HP5'; // Reemplaza con tu clave API de Alpha Vantage
const timeSeries = ['TIME_SERIES_DAILY', 'TIME_SERIES_WEEKLY', 'TIME_SERIES_MONTHLY'];
let functionType = timeSeries[0]; // default value
let stockData = {};

// Función para normalizar los datos
function normalize(data) {
    // Encuentra el primer valor no nulo
    const firstNonNullIndex = data.findIndex(value => value !== null && value !== 0);
    const initial = data[firstNonNullIndex];
    // Normaliza los datos basados en el primer valor no nulo
    return data.map(value => (value / initial) * 100);
}

// Función para obtener los datos de la API
async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (functionType === 'TIME_SERIES_DAILY' && data['Time Series (Daily)']) {
        return data['Time Series (Daily)'];
    } else if (functionType === 'TIME_SERIES_WEEKLY' && data['Weekly Time Series']) {
        return data['Weekly Time Series'];
    } else if (functionType === 'TIME_SERIES_MONTHLY' && data['Monthly Time Series']) {
        return data['Monthly Time Series'];
    } else {
        return null;
    }
}

// Función principal para obtener los datos y graficarlos
async function main() {
    const seriesSelect = document.getElementById('series');
    functionType = timeSeries[seriesSelect.value];
    console.log(functionType);
    const symbolSelect = document.getElementById('symbols');
    const selectedOptions = Array.from(symbolSelect.selectedOptions);
        console.log('selectedOptions:', selectedOptions);
    const selectedSymbols = selectedOptions.map(option => option.value);
        console.log('selectedSymbols:', selectedSymbols);
        console.log('selectedSymbols.length:', selectedSymbols.length);
    const dateLabels = [];
    const datasets = [];
    const maxPoints = 120; // Número máximo de puntos a mostrar

  if(1){
    for (let i = 0; i < selectedSymbols.length; i++) {
        const symbol = selectedSymbols[i];
        const timeSeries = await fetchStockData(symbol);
        if (timeSeries) {
            const dates = Object.keys(timeSeries).reverse();
            const closingPrices = dates.map(date => parseFloat(timeSeries[date]['4. close'])); 
            // Limitar el número de puntos a los últimos maxPoints
            const limitedDates = dates.slice(-maxPoints);
            const limitedClosingPrices = closingPrices.slice(-maxPoints);
                        
            if (i === 0) {
                dateLabels.push(...limitedDates);
            }
            // Si hay menos de maxPoints, rellenar con nulls al principio
            const filledClosingPrices = Array(maxPoints - limitedClosingPrices.length).fill(null).concat(limitedClosingPrices);
            const normalizedData = normalize(filledClosingPrices);
            datasets.push({
                label: symbol,
                data: normalizedData,
                borderColor: `hsl(${i * 360 / selectedSymbols.length}, 70%, 50%)`,
                fill: false
            });
        }
    }
    
    // Configurar y crear el gráfico
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Normalized Stock Prices Over Time'
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: functionType === 'TIME_SERIES_DAILY' ? 'day' : functionType === 'TIME_SERIES_WEEKLY' ? 'week' : 'month'
                    }
                }
            }
        }
    });
  }
}

document.getElementById('fetchData').addEventListener('click', main);

