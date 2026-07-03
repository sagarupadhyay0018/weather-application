let weatherCity = document.querySelector(".weathercity");
let weatherDateAndTime = document.querySelector(".weatherdateandtime");
let weatherForecast = document.querySelector(".weatherforecast");
let weatherIcon = document.querySelector(".weathericon");
let weatherTemperature = document.querySelector(".weathertemperature");
let weatherMin = document.querySelector(".weathermin");
let weatherMax = document.querySelector(".weathermax");
let weatherFeelsLike = document.querySelector(".weatherfeelslike");
let humidity = document.querySelector(".humidity");
let windElement = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");
let inputt = document.querySelector(".weathersearch");



// number to name conversion

const getcity = (code) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
}


// to get time and all 

const timefunction = (dt) => {

    let time = new Date(dt * 1000)
    let option = {

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    }


    return new Intl.DateTimeFormat("en-US", option).format(time);


}




// main weather function

async function weathercityfunction(city) {
    try {

        const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cc0228f90ab4da9a3b6e449adcf52ab5`;

        let rowdata = await fetch(weatherurl, {
            headers: {
                accept: "application/json"
            }
        })

        let data = await rowdata.json();

        console.log(data)


        let { main, name, weather, wind: windData, sys, dt } = data;

        weatherCity.textContent = `${name}, ${getcity(sys.country)} `
        weatherDateAndTime.textContent = timefunction(dt)
        weatherForecast.textContent = weather[0].main
        weatherIcon.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png">
        `;
        weatherTemperature.textContent = `${Math.floor(main.temp)}`


        weatherMin.textContent =
            `min: ${main.temp_min}°C`;


        weatherMax.textContent =
            `max: ${main.temp_max}°C`;


        weatherFeelsLike.textContent = `${main.feels_like}`
        humidity.textContent = main.humidity
        windElement.textContent = windData.speed
        pressure.textContent = `${main.pressure} lb`


    } catch (err) {
        console.log(err)
    }



}

inputt.addEventListener("submit", function (e) {

    e.preventDefault()
    let citynamee = document.querySelector(".cityname")

    city = citynamee.value;

    weathercityfunction(city)

    citynamee = " "




})


window.addEventListener("load", function () {
    weathercityfunction("delhi")
})