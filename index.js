const apiKey = "12341234123412341234123412341234"

document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getCityCoordinates(city);

});

function getCityCoordinates(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const {lat, lon } = data.coord;
        getWeatherData(lat, lon, city);
        addToHistory(city);
    })
    .catch(error => console.error('Error fetching city coordinates:', error));
}

function displayWeatherData(lat, lon, city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayWeatherData(data,city);
        displayForecast(data);
    })
    .catch(error => console.error('Error fatching weather data:', error));
}

function displayCurrentWeather(data,city) {
    const currentWeather = data.list[0];
    const weatherHTML = `
    <h3>${cityt} ${new Date(currentWeather.dt * 1000).toLocaleDateString()}</h3>
    <p>Temperature: ${currentWeather.main.temp} °C</p>
    <p>Humidity: ${currentWeather.main.humidity} %</p>
    <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    <p>Rain Probabilities: ${currentWeather.pop*100} %</p>
    <p>Feels Like: ${currentWeather.main.feels_like}°C</p>
    <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}"
    `;
    document.getElementById('current-weather-details').innerHTML = weatherHTML;
}

function displayForecast(data) {
    const forecastHTML = data.list.slice(1,6).map(day => `
        <div class="forecast-item">
            <p> Date: ${new Date(dat.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: ${day.main.temp} °C</p>
            <p>Humidity: ${dai.main.humidity} %</p>
            <p>Wind Speed: ${day.wind.speed} m.s</p>
            <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
        </div>
        `).join('');
   
    document.getElementById('forecast-details').innerHTML = forecastHTML;
 }

 function addToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherHistory', JSON.stringify(history));
        displayHistory();
    }
 }

 function displayHistory() {
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const historyHTML = history.map(city => `<li>${city}</li>`).join('');
    document.getElementById('history-list').innerHTML = historyHTML;

    document.querySelectorAll('#historu-list li').forEach(item => {
        item.addEventListener('click', function() {
            const city = this.textContent;
            getCityCoordinates(city);
        });
    });
 }

 displayHistory();