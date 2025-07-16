const apiKey = '4dfaa790a6b26a32de018da9700bb1ab';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherResult = document.getElementById('weatherResult'); // Corrected typo here!
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const errorMessage = document.getElementById('errorMessage');
const loader = document.getElementById('loader');
const welcomeMessage = document.getElementById('welcomeMessage');

lucide.createIcons();

searchButton.addEventListener('click', getWeather);

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter'){
        getWeather();
    }
});

async function getWeather(){
    const city = cityInput.value.trim();

    if (!city){
        showError('Por favor, ingresa el nombre de una ciudad.');
        return;
    }

    // Corrected string interpolation with backticks
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

    showLoading();

    try{
        const response = await fetch(apiUrl);

        if (!response.ok){
            throw new Error('Ciudad no encontrada. Verifica el nombre e inténtelo de nuevo');
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error){
        showError(error.message);
    }
}

function displayWeather(data){
    loader.classList.add('hidden');
    welcomeMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    cityName.textContent = data.name;
    // Corrected string interpolation with backticks
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherResult.classList.remove('hidden');
}

function showError(message){
    loader.classList.add('hidden');
    weatherResult.classList.add('hidden');
    welcomeMessage.classList.add('hidden');

    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function showLoading(){
    errorMessage.classList.add('hidden');
    weatherResult.classList.add('hidden');
    welcomeMessage.classList.add('hidden');
    loader.classList.remove('hidden');
}