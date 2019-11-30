window.addEventListener('load', ()=> {
    let longitude;
    let latitude;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);

        });
    } else {
        h1.textContent = "Enable geolocation to check the weather in your area"
    }
})