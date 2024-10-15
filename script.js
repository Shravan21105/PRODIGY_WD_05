const apiKey = "67d2148e179f8e57f958b9191847c1b0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCondition = document.querySelector(".weather-condition"); // Select the new element

async function checkWeather(city) {
    const response = await fetch(apiUrl + `q=${city}&appid=${apiKey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".details").style.display = "none";
        document.querySelector(".city").style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Convert sunset and sunrise from Unix timestamp to local time
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        const localTime = new Date(data.dt * 1000); // Current time in city timezone

        // Check if it's day or night
        const isNight = localTime < sunrise || localTime > sunset;

        // Update the weather icon based on weather conditions
        const condition = data.weather[0].main; // Get the main weather condition
        weatherCondition.innerHTML = condition; // Update the weather condition text
        if (condition === "Clouds") {
            weatherIcon.src = isNight ? "Assets/cloud_night.png" : "Assets/cloud.png";
        } else if (condition === "Clear") {
            weatherIcon.src = isNight ? "Assets/clear_night.png" : "Assets/clear.png";
        } else if (condition === "Rain") {
            weatherIcon.src = isNight ? "Assets/rain_night.png" : "Assets/rain.png";
        } else if (condition === "Drizzle") {
            weatherIcon.src = isNight ? "Assets/drizzle_night.png" : "Assets/drizzle.png";
        } else if (condition === "Snow") {
            weatherIcon.src = isNight ? "Assets/snow_night.png" : "Assets/snow.png";
        } else if (condition === "Haze") {
            weatherIcon.src = isNight ? "Assets/haze_night.png" : "Assets/haze.png";
        }

        // Make weather data visible
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".city").style.display = "block";
        document.querySelector(".details").style.display = "flex";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
