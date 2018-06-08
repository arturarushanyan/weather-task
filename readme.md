# Weather App with pure JS, HTML and CSS

The app is for getting a forecast for selected city. On initial load app will ask for allowing geolocation permissions. Please allow in order for using the app properly.
In case of not allowing geolocation alert box will appear and after Berlin will be selected as a default city.
The app is written using Javascript, html and css. However, I've setted up just a very basic express server for running it.


## Getting Started

Clone the Repository, Install dependencies and run 'npm start'

### Installing

Clone the repository or download the .zip

Install dependencies

```
npm install
```

And start the project

```
npm start
```

End with an example of getting some data out of the system or using it for a little demo

### Project Structure


    .
    ├── ...
    ├── public                    # Public files
    │   ├── css                   # css files
    │   ├── js                    # js files
    │   ├── index.html            # main index html file
    └─ server.js                  # server file

>

## About the solutions

Here is built basic express server for serving static files such as index.html, app.js and styles.css.
App is relying to Weather class which is used to get all things related to the project. It gets the related weather forecast data and renders it to the view.
Every time when user refreshes the page, geolocation api gets user's position and created new instance of Weather class with latitude and longitude of the user.
If geolocation api is switched off or user rejects using it, Berlin will be selected as default.
When user selectes another city from dropdown, again, new instance if Weather class is created and getForecast() method is called.
Weather class contains methods for getting forecast data, rendering it to the view. Also it has methods for resetting previous data when new one is requested
to avoid mess of adding two cities data together. Initially 7 day temperature table is rendered to the view.

The selection of Days: As I've already got a day related data from api call, I've just render it initially and set 'display: none' with css. As user clicks on a current day,
dropdown just opens by adding class to it.

#### Bonus 2
Unfortunately I haven't done bonus 2 section of the task. I've couldn't find a request or getting summary of all days weather.

