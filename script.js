const searchBtn = document.getElementById(`searchBtn`)
const weatherInfo=document.getElementById('weatherInfo')
const spinner = document.getElementById('spinner');
const errorMessage = document.getElementById('error')

weatherInfo.classList.add('hidden');
searchBtn.addEventListener(`click`,()=>{
 
  const city = document.getElementById(`cityInput`).value;
    weatherInfo.innerHTML = '';
    errorMessage.textContent=``;
   
   
    if (!city || !isNaN(city)) {
      weatherInfo.innerHTML = '<p class="text-danger">Please enter a valid city name.</p>';
        weatherInfo.style.display = 'block'; 
        spinner.style.display = 'none'; // Hide spinner
        
        console.log(weatherInfo)
        return;
   }
  
 spinner.style.display = 'block';
 weatherInfo.style.display = `<h4>Weather Data Loaded!</h4>`
       
//fetch details from API
  fetchWeather(city)
  .then(data=>{
    const temp = (data.main.temp - 273.15).toFixed(2);
    //weatherInfo.innerText=temp
    const weather = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
    // background color change
    let backgroundColor;
    if (temp < 0) {
        backgroundColor = '#add8e6'; // Light blue for cold
    } else if (temp < 15) {
        backgroundColor = '#f0e68c'; // Khaki for cool
    } else if (temp< 30) {
        backgroundColor = '#90ee90'; // Light green for warm
    } else {
        backgroundColor = '#ff6347'; // Tomato for hot
    }

        weatherInfo.innerHTML = `
        <div class="card" style="background-color: ${backgroundColor};">
        <div class="card-body">
        <h5>${city}</h5>
        <p>Temperature: ${temp} °C</p>
        <p>Weather:${weather}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        
        </div>
        </div>
    `;
  
        weatherInfo.classList.remove('hidden')
  
  })
  .catch(err=>{
    weatherInfo.innerHTML = `<p class="text-danger">Error: ${err.message}</p>`;
    weatherInfo.style.display = 'block'; 
    weatherInfo.classList.add('hidden')

 })
  .finally(()=>{
    spinner.style.display='none'
  });
});

function fetchWeather(city){
    const apiKey = 'befd984de4d3c050671d4eb935e6c660'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  return fetch(url)
  .then(response=>{
    if(!response.ok){
        throw new Error(`city not found`)
    }
    return response.json()
  })

}
function handleError(err){
  errorMessage.textContent = err.errorMessage;
 
  
}