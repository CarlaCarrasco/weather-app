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
                // set DOM elements from the API
                timeZone.textContent = data.timezone;
                tempDegree.textContent = Math.floor(temperature);
                tempDesc.textContent = summary;

                // Formula for celcius
                let celcius = (temperature - 32) * (5/9);
                // set Icon
                setIcons(icon, document.querySelector(`.icon`));

                // Change temperature to Celsius/Farenheit
                tempSec.addEventListener('click', () => {
                    if(tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C';
                        tempDegree.textContent = Math.floor(celcius);
                        console.log(tempSpan.textContent)
                    } else {
                        tempSpan.textContent = 'F';
                        tempDegree.textContent = Math.floor(temperature);
                    }
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
    // else {
    //     h1.textContent = "Enable geolocation to check the weather in your area"
    // }
})