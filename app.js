window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    let timeZone = document.querySelector('.timezone');
    let tempDesc = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let tempSec = document.querySelector(`.temp-section`);
    let tempSpan = document.querySelector('.temp-section span');
    let currentHumidity = document.querySelector('.humidity');
    let percip = document.querySelector('.percip');
    let moonPhase = document.querySelector('.wind');
    let day1high = document.querySelectorAll('.daily-high-degree');
    let day1low = document.querySelectorAll('.daily-low-degree');
    let day1percip = document.querySelectorAll('.daily-percip-percent');
    let dailyIcon = document.querySelectorAll(`.daily-icon`);
    let curDay = new Date();
    let today = curDay.getDay();
    displayDate = (today) => {
        let displayDay = document.querySelector('.date');
        let weekDay = document.querySelectorAll('.weekday');
        let allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        displayDay.textContent = allDays[today];
        let day = 1;
            while(day < 5) {
                if (today >= 6){
                    weekDay[day-1].textContent = allDays[day-1];
                }
                else {
                    weekDay[day-1].textContent = allDays[today + day];
                }
                day++;
            }
    }
displayDate(today);
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/` // for building the app locally
            const api = `${proxy}https://api.darksky.net/forecast/0755c8e4747aca741c24bac39e7e7094/${latitude},${longitude}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {humidity, precipProbability, temperature, summary, icon, windSpeed}= data.currently;
                const daily =data.daily;
                const weeklyData = data.daily.data;
                const celcius = (temperature - 32) * (5/9); // Formula for celcius
                // set DOM elements from the API
                // Current Weather
                timeZone.textContent = data.timezone;
                tempDegree.textContent = Math.floor(temperature);
                tempDesc.textContent = summary;
                currentHumidity.textContent = `${Math.floor(humidity * 100)}%`;
                percip.textContent = `${Math.floor(precipProbability * 100)}%`;
                moonPhase.textContent = `${Math.floor(windSpeed)} mph`;

                // This weeks forecast
                for (let weekDay = 0; weekDay < 4; weekDay++) {
                    day1high[weekDay].textContent = Math.floor(weeklyData[weekDay].apparentTemperatureHigh);
                    day1low[weekDay].textContent = Math.floor(weeklyData[weekDay].apparentTemperatureLow);
                    day1percip[weekDay].textContent = `${Math.floor(weeklyData[weekDay].precipProbability * 100)}%`;
                    setIcons(weeklyData[weekDay].icon, dailyIcon[weekDay]);
                }
                // set Icon
                setIcons(icon, document.querySelector(`.today-icon`));

                // Change temperature to Celsius/Farenheit
                tempSec.addEventListener('click', () => {
                    tempConversion (tempSpan, tempDegree, celcius, temperature);
                });
            });
        });
        
    } 
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // replace format to _ between spaces
        skycons.play(); // play svg
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function tempConversion (span, degree, cel, temp) {
        if(span.textContent === '°F') {
            span.textContent = '°C';
            degree.textContent = Math.floor(cel);
        } else {
            span.textContent = '°F';
            degree.textContent = Math.floor(temp);
        }
    }
    
});