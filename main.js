const API_KEY = "424f3dae86d8a76c0708ff85124b065b";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const clearBtn = document.querySelector('.start');
async function checkWeather(city) {
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
  if(response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.error').style.display = 'none';
    }, 2000);
    document.querySelector('.weather').style.display = 'none';
  } else {
    let data = await response.json();
    console.log(data);
    const weatherWrap = document.createElement('div');
    weatherWrap.classList.add('weather');
    weatherWrap.innerHTML = `
    <h1 class="temp">${data.main.temp}°c</h1>
    <h2 class="city">${data.name}</h2>
    <div class="details">
     <div class="general-wrap">
       <div class="col">
         <img src="./images/humidity.png">
       </div>
       <div>
         <p class="humidity">${data.main.humidity}%</p>
         <p>Humidity</p>
       </div>
     </div>
      <div class="general-wrap">
        <div class="col">
          <img src="./images/wind.png">
        </div>
        <div>
          <p class="wind">${data.wind.speed}km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
`;
    const weatherImg = document.createElement('img');
    weatherImg.classList.add('weather-icon');
    weatherWrap.prepend(weatherImg);
    if (data.weather[0].main == 'Clouds') {
      weatherImg.src = 'images/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherImg.src = 'images/clear.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherImg.src = 'images/drizzle.png';
    } else if (data.weather[0].main == 'Humidity') {
      weatherImg.src = 'images/humidity.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherImg.src = 'images/mist.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherImg.src = 'images/rain.png';
    } else if (data.weather[0].main == 'Snow') {
      weatherImg.src = 'images/snow.png';
    } else if (data.weather[0].main == 'Wind') {
      weatherImg.src = 'images/wind.png';
    } else if (data.weather[0].main == 'Smoke') {
      weatherImg.src = 'images/smoke.png';
    }
    const card = document.querySelector('.card');
    card.append(weatherWrap);
    document.querySelector('.weather').style.display='block';
  }
};

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
})

clearBtn.addEventListener("click", () => {
  const weather = document.querySelector('.weather');
  weather.innerHTML = "";
});