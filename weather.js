const axios = require('axios');
const apiKey = '5c01bb4a1e8c5b1a731bb6401eb2721b'; 
const city = 'Pune'; 

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
axios.get(apiUrl)
  .then((response) => {
    const weatherData = response.data;
    const temperatureKelvin = weatherData.main.temp;
    const temperatureCelsius = kelvinToCelsius(temperatureKelvin);
    const description = weatherData.weather[0].description;
    const cityName = weatherData.name;

    console.log(`Weather in ${cityName}:`);
    console.log(`Temperature: ${temperatureCelsius.toFixed(2)}°C`);
    console.log(`Description: ${description}`);
  })
  .catch((error) => {
    console.error('Error fetching weather data:', error);
  });
