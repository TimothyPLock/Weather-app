async function getWeather() {
    //fetching weather data
    try{
        const objResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.165512&longitude=-85.48526&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FChicago&forecast_days=1&models=icon_seamless', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        })

        //making sure we got a response
        if(!objResponse.ok){
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }

        //parsing the objResponse
        const objData = await objResponse.json();

        //console.log(objData)
        sendWeatherInfo(objData);

    } catch(objError) {
        console.log('Error fetching weather data', objError)
    }
}

function sendWeatherInfo(weatherData){
    //initializing variables
    let currentWeatherIcon = '';
    const currentTemp = weatherData.current.temperature_2m;
    const currentHigh = weatherData.daily.temperature_2m_max[0];
    const currentLow = weatherData.daily.temperature_2m_min[0];
    const currentHumidity = weatherData.current.relative_humidity_2m;
    const currentWeatherCode = weatherData.current.weather_code;

    //conditional to pick right icon
    if(currentWeatherCode == 0 || currentWeatherCode == 1){
        currentWeatherIcon = 'bi-sun';
    } else
    if (currentWeatherCode == 2 || currentWeatherCode == 3){
        currentWeatherIcon = 'bi-cloud-sun';
    } else
    if (currentWeatherCode == 45 || currentWeatherCode == 48){
        currentWeatherIcon = 'bi-cloud-haze2';
    } else
    if (currentWeatherCode == 51 || currentWeatherCode == 53 || currentWeatherCode == 55){
        currentWeatherIcon = 'bi-cloud-drizzle';
    } else
    if (currentWeatherCode == 56 || currentWeatherCode == 57){
        currentWeatherIcon = 'bi-cloud-sleet';
    } else
    if (currentWeatherCode == 61 || currentWeatherCode == 63 || currentWeatherCode == 65 || currentWeatherCode == 80 || currentWeatherCode == 81 || currentWeatherCode == 82){
        currentWeatherIcon = 'bi-cloud-rain';
    } else
    if (currentWeatherCode == 66 || currentWeatherCode == 67){
        currentWeatherIcon = 'bi-cloud-hail';
    } else
    if (currentWeatherCode == 71 || currentWeatherCode == 73 || currentWeatherCode == 75 || currentWeatherCode == 77 || currentWeahterCode == 85 || currentWeatherCode == 86){
        currentWeatherIcon = 'bi-cloud-snow';
    } else
    if (currentWeatherCode == 95 || currentWeatherCode == 96 || currentWeatherCode == 99){
        currentWeatherIcon = 'bi-cloud-lightning-rain';
    }

    //setting the data to the HTML tagged elements
    //done differently for aria label since the aria label is in the changing data
    const temp = document.querySelector('[data-current-temp]');
    temp.textContent = currentTemp;
    document.querySelector('[data-current-high]').textContent = currentHigh;
    document.querySelector('[data-current-low]').textContent = currentLow;
    document.querySelector('[data-current-humidity]').textContent = currentHumidity;
    //done differently since it is an icon
    const iconType = document.querySelector('[data-current-icon]')
    iconType.className = `bi ${currentWeatherIcon} weather-icon`;

    //setting aria labels
    iconType.setAttribute('aria-label', `Weather Icon: ${currentWeatherIcon.replace('bi-', '')}`);
    temp.setAttribute('aria-label', `The current weather is ${currentTemp} degrees`);
    document.querySelector('[aria-current-high]').closest('.info-group').querySelector('.label').setAttribute('aria-label', `The high for today is ${currentHigh} degrees`);
    document.querySelector('[aria-current-low]').closest('.info-group').querySelector('.label').setAttribute('aria-label', `The low for today is ${currentLow} degrees`);
    document.querySelector('[aria-current-humidity]').closest('.info-group').querySelector('.label').setAttribute('aria-label', `The humidity is ${currentHumidity}%`);
}

getWeather(); //function call

//Used deepseek to help with debugging and checking for syntax errors. As well as troubleshooting one error in css, helped me find !important.
//The GithubCopilot extension was loaded into VSCode and was used with repeating lines of code with small variations.
//used Web Dev Simplified's "How To Build A Weather App In JavaScript Without Needing A Server" video for help with css and the API.
//Link to the video: https://youtu.be/w0VEOghdMpQ?si=vnW1D07IMH0WN8HB
//Used favicon generator for the icon information including the header and icon files.