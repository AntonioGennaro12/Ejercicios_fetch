const apiKey = 'WCH8EC3ECIOS0HP5'; // Reemplaza con tu clave API de Alpha Vantage
const timeSeries = ['TIME_SERIES_DAILY', 'TIME_SERIES_MONTHLY'];
let functionType = timeSeries[0]; // default value
let stockData = {};

// Función para normalizar los datos
function normalize(data) {
    const initial = data[0];
    return data.map(value => (value / initial) * 100);
}

// Función para obtener los datos de la API
async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (functionType === 'TIME_SERIES_DAILY' && data['Time Series (Daily)']) {
        return data['Time Series (Daily)'];
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
    // Obtener los símbolos seleccionados
    const symbolSelect = document.getElementById('symbols');
    //const selectedSymbols = Array.from(symbolSelect.selectedOptions).map(option => option.value);
    const selectedOptions = Array.from(symbolSelect.selectedOptions);
    // Comprobaciones de consola para verificar la selección múltiple
        console.log('selectedOptions:', selectedOptions);
    const selectedSymbols = selectedOptions.map(option => option.value);
        console.log('selectedSymbols:', selectedSymbols);
        console.log('selectedSymbols.length:', selectedSymbols.length);
    
    const dateLabels = [];
    const datasets = [];

  if(1){
    for (let i = 0; i < selectedSymbols.length; i++) {
        const symbol = selectedSymbols[i];
        const timeSeries = await fetchStockData(symbol);

        if (timeSeries) {
            const dates = Object.keys(timeSeries).reverse();
            const closingPrices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

            if (i === 0) {
                dateLabels.push(...dates);
            }

            const normalizedData = normalize(closingPrices);
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
                        unit: functionType === 'TIME_SERIES_DAILY' ? 'day' : 'month'
                    }
                }
            }
        }
    });
  }
}

document.getElementById('fetchData').addEventListener('click', main);

