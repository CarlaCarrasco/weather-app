window.addEventListener('load', ()=> {
    let longitude;
    let latitude;
    let timeZone = document.querySelector('.timezone');
    let tempDesc = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let tempSec = document.querySelector(`.temp-section`);
    let tempSpan = document.querySelector('.temp-section span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            const proxy = `http://cors-anywhere.herokuapp.com/` // for building the app locally
            const api = `${proxy}https://api.darksky.net/forecast/eb5f2de031c4719b8a6e02b9b79630ac/${latitude},${longitude}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon}= data.currently;
                // Formula for celcius
                const celcius = (temperature - 32) * (5/9);

                // set DOM elements from the API
                timeZone.textContent = data.timezone;
                tempDegree.textContent = Math.floor(temperature);
                tempDesc.textContent = summary;
                
                // set Icon
                setIcons(icon, document.querySelector(`.icon`));

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
        if(span.textContent === 'F') {
            span.textContent = 'C';
            degree.textContent = Math.floor(cel);
        } else {
            span.textContent = 'F';
            degree.textContent = Math.floor(temp);
        }
    }
    
})