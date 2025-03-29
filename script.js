// A toi de jouer pour cette partie :-) Happy coding !

async function fetchCoordinates(geoCodeCity) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${geoCodeCity}&format=json&addressdetails=1&limit=1`)
    const data = await response.json();
  

    if(data.length>0){
        return data[0];
    } else {

        return ("Ville non trouvée.")
    }

}

//fetchCoordinates();

async function fetchWeather(lat , lon){
    const response =  await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m`)
    const dataWeather = await response.json();
    
  

    if (dataWeather.current_weather) {
        return dataWeather.current_weather;
    } else {
        return null;
    }

}

//fetchWeather(lat , lon);


const cityInput = document.getElementById("cityInput");
const okButton = document.querySelector(".city-search button");
const cityElement = document.getElementById("city");
const gpsElement = document.getElementById("gps");
const temperatureElement = document.getElementById("temperature");
const detailsElement = document.getElementById("details");

okButton.addEventListener("click", async function() {
    const geoCodeCity = cityInput.value;
    gpsElement.textContent = ("Chargement..."); 

    const coordinates = await fetchCoordinates(geoCodeCity);
    console.log(coordinates);

    if (coordinates !== "Ville non trouvée.") {
   

        console.log("ville");
        
        gpsElement.textContent = `Latitude: ${coordinates.lat}, Longitude: ${coordinates.lon}`;
    


    const weatherData = await fetchWeather(coordinates.lat, coordinates.lon);
         if(weatherData){
            temperatureElement.textContent = `${weatherData.temperature}°C`;
         console.log(weatherData)
        } else {
            temperatureElement.textContent = '-°C';
        }
} else {
        
    gpsElement.textContent = coordinates;
    temperatureElement.textContent = '-°C';
}
});










