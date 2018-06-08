//configuration for api
const config = {
    REQUEST_URL: 'https://api.openweathermap.org/data/2.5/forecast/daily?',
    APP_ID: '29493e3ff824103873654bf92a58ec07',
    MODE: 'json',
    UNITS: 'metric',
    FORMAT_DATE_OPTIONS: {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }
};

// function for formatting date
const formatDate = date => {
    const dt = new Date(parseInt(date + '000'));
    return dt.toLocaleDateString('en-EN', config.FORMAT_DATE_OPTIONS);
};

//Weather class which is used for getting weather data and displaying it on view
// @params {city, days, lat, lng}
// city - city name,
// days - count of days for requesting data,
// lat and lng - geo location coordinates
// we can get forecast data by either sending city name as a parameter or location coordinates - latitude and longitude
class Weather {
    constructor(city, days, lat, lng) {
        this.city = city;
        this.days = days;
        this.lat = lat;
        this.lng = lng;
        this.targetElement = {
            cityName: document.getElementById('city-name'),
            dateRow: document.getElementById('date-row'),
            dayDescription: document.getElementById('day-description')
        }
    }

    //method for getting weather data
    getForecast() {
        let fetchUrl = `${config.REQUEST_URL}appid=${config.APP_ID}&mode=${config.MODE}&units=${config.UNITS}&cnt=${this.days}&q=${this.city}`;

        if(this.lat && this.lng){
            fetchUrl = `${config.REQUEST_URL}appid=${config.APP_ID}&mode=${config.MODE}&units=${config.UNITS}&cnt=${this.days}&lat=${this.lat}&lon=${this.lng}`
        }

        this.resetWeatherData(); //resetting existing weather

        fetch(fetchUrl)
            .then(res => res.json())
            .then((data) => {
                this.selectCityFromDropdown(data); // selecting city from dropDown
                this.renderForecastData(data); //rendering received data to view
            })
    }

    //method for rendering forecast data to view
    renderForecastData(data) {
        this.targetElement.cityName.innerHTML = data.city.name;
        this.targetElement.dateRow.innerHTML = '<th><p>Date</p><p>Temp</p></th>';
        data.list.forEach((list) => {
            const dayMatch = formatDate(list.dt) === new Date().toLocaleDateString('en-EN', config.FORMAT_DATE_OPTIONS);
            this.targetElement.dateRow.innerHTML +=
                `<td id="${list.dt}" class="day-column ${dayMatch ? 'selected' : ''}" onclick="openDescription(${list.dt})">
                <p>${formatDate(list.dt)}</p> 
                <p>${list.temp.day}&deg;C</p>
            </td>`;
            this.targetElement.dayDescription.innerHTML +=
                `<td colspan="8" class="description-col ${list.dt} ${ dayMatch ? 'opened': ''}">
                <div class="day">
                    <h3>Full forecast for selected day</h3>
                    <span>Clouds: ${list.clouds}</span>
                    <span>Deg: ${list.deg}</span>
                    <span>Humidity: ${list.humidity}</span>
                    <span>Pressure: ${list.pressure}</span>
                    <span>Rain: ${list.rain}</span>
                    <span>Wind Speed: ${list.speed}</span>
                    <p>Temperature</p>
                    <span>Day: ${list.temp.day}</span>
                    <span>Night: ${list.temp.night}</span>
                    <span>Morning: ${list.temp.morn}</span>
                    <span>Evening: ${list.temp.eve}</span>
                </div>
            </td>`;
        })
    }

    // method for selecting city from dropDown list. Selected city is requested city for forecast
    selectCityFromDropdown(data) {
        const selectElements = document.getElementById('city-select');

        Array.from(selectElements.options).forEach(el => {
            if(el.value === data.city.name){
                el.selected = true;
            }
        });
    }

    //method for resetting existing weather data
    resetWeatherData() {
        this.targetElement.dateRow.innerHTML = '';
        this.targetElement.dayDescription.innerHTML = '';
        this.targetElement.cityName.innerHTML = 'Loading...';
    };
}

// Updating weather from select dropDown
const updateWeather = (event) => {
    const selectedWeather = new Weather(event.target.value, 7);
    selectedWeather.getForecast();
};

//opening full forecast for selected day
const openDescription = (itemId) => {
    const closingElements = Array.from(document.getElementsByClassName('description-col'));
    const unselectedElements = Array.from(document.getElementsByClassName('day-column'));
    const openingElement = document.getElementsByClassName(`${itemId}`)[0];
    const selectedElement = document.getElementById(`${itemId}`);

    //removing opened class from all elements
    closingElements.forEach((el) => {
        el.classList.remove('opened');
    });

    //removing selected class from all elements
    unselectedElements.forEach((el) => {
        el.classList.remove('selected');
    });

    //adding classes to selected elements
    openingElement.classList.add('opened');
    selectedElement.classList.add('selected');
};

//detecting users location by geoLocation api
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const currentCity = new Weather('', 7, position.coords.latitude, position.coords.longitude);
        currentCity.getForecast();
    });
} else {
    alert('Geolocation is not supported in your browser');
}
