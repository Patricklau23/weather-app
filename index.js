const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '6390d9a7c712a05338172d3f7b9c6462';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const feels_like = document.querySelector('.weather-box .feels_like');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const high = document.querySelector('.weather-box .wrapper .high');
            const low = document.querySelector('.weather-box .wrapper .low')
    
            

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    container.style.backgroundImage = "url('images/clearbackground.jpg')";
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    container.style.backgroundImage = "url('images/rainbackground.jpg')";
                    break;

                case 'Snow':
                    image.src = 'images/snow.jpg';
                    container.style.backgroundImage = "url('images/snowbackground.jpg')";
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    container.style.backgroundImage = "url('images/cloudbackground.jpg')";
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    container.style.backgroundImage = "url('images/hazebackground.jpg')";
                    break;

                default:
                    image.src = '';
                    container.style.backgroundImage ='';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            feels_like.innerHTML = `Feels like: ${parseInt(json.main.feels_like)} <span>°C</span>`;
            high.innerHTML = `day high: ${parseInt(json.main.temp_max)}°C`;
            low.innerHTML = `day low: ${parseInt(json.main.temp_min)}°C`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});