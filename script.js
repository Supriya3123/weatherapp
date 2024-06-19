const cointainer = document.querySelector(".cointainer");
const search = document.querySelector(".searchbox button");
const weatherBox = document.querySelector(".weatherbox")
const weatherDetails = document.querySelector(".weatherdetails")
const error404 =document.querySelector(".notfound")
search.addEventListener("click", () => {
    const APIKey = "5193703c53eb2630238c6a7fc7a14fdb";
    const city = document.querySelector(".searchbox input").value;
    if (city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
        &appid=${APIKey}`).then(response => response.json()).then(json => {
        if(json.cod == '404'){
            cointainer.style.height ='404px'
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active')
            error404.classList.add('active')
            return;
        }
        cointainer.style.height ='555px'
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active')
        error404.classList.remove('active')
               

        const image = document.querySelector('.weatherbox img')
        const temperture = document.querySelector(".weatherbox .temperture")
        const description = document.querySelector('.weatherbox .description')
        const humidity = document.querySelector('.weatherdetails .humidity span')
        const wind = document.querySelector('.weatherdetails .wind span')

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png'
                break;
            case 'Rain':
               image.src = 'images/rain.png'
                break;
            case 'Clouds':
                image.src = 'images/cloud.png'
                break;
            case 'Mist':
                image.src = 'images/mist.png'
                break;
            case 'Snow':
                image.src = 'images/snow.png'
                break;
            case 'Haze':
                image.src = 'images/mist.png'
                break;
            default:
                image.src='images/cloud.png'
                break;
        }
        temperture.innerHTML=`${Math.round(json.main.temp - 273.15)}<span>°C</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`
    })

})
