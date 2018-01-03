const key       = 'e2a4d8b55c5d115b04b00a5b2b95c1c9'
const button    = document.querySelector('.submit')
const buttonC   = document.querySelector('.celc')
const buttonF   = document.querySelector('.faren')
let   input     = document.querySelector('.input')

const temp_1      = document.getElementById('temperature_1')
const temp_3      = document.getElementById('temperature_3')
const temp_4      = document.getElementById('temperature_4')
const temp_5      = document.getElementById('temperature_5')
const temp_6      = document.getElementById('temperature_6')

const loc_1       = document.getElementById('location_1')

const data_2      = document.getElementById('data_2') 
const data_3      = document.getElementById('data_3')
const data_4      = document.getElementById('data_4')
const data_5      = document.getElementById('data_5')

const icon        = document.getElementById('icon-main')
const icon_2      = document.getElementById('icon_2')
const icon_3      = document.getElementById('icon_3')
const icon_4      = document.getElementById('icon_4')
const icon_5      = document.getElementById('icon_5')

const humidity_1  = document.getElementById('humidity_1')
const options   = { weekday: 'long', day: 'numeric' }
  
button.addEventListener('click',()=>{
    let city = input.value
        const updateByCity = (x) => {
            let url = "https://api.openweathermap.org/data/2.5/forecast?" +
	            "q=" + x +
                "&APPID=" + key
                sendRequest(url)
        }
        input.value = ''
    updateByCity(city)
})

const Faren = (c) => Math.round(c * (9/5) - 459.67)

const Celc = (k) => Math.round(k - 273.15)

const sendRequest = (url) => {  
    const link = fetch(url)
        .then(data => data.json())
            .then(data =>{
        const main = () => {
            let weather = {} 
                let second  = data.list[5].dt_txt
                let third   = data.list[10].dt_txt
                let fourth  = data.list[18].dt_txt
                let fifth   = data.list[26].dt_txt
                         weather.icon        = data.list[0].weather[0].id
                         weather.icon_2      = data.list[5].weather[0].id
                         weather.icon_3      = data.list[13].weather[0].id
                         weather.icon_4      = data.list[21].weather[0].id
                         weather.icon_5      = data.list[29].weather[0].id
                         weather.humidity    = data.list[0].main.humidity
                         weather.loc         = data.city.name
                         weather.data_2      = new Date(second).toLocaleString('ru', options)
                         weather.data_3      = new Date(third).toLocaleString('ru', options)
                         weather.data_4      = new Date(fourth).toLocaleString('ru', options)
                         weather.data_5      = new Date(fifth).toLocaleString('ru', options)
                         weather.temp_1      = Celc(data.list[1].main.temp)
                         weather.temp_3      = Celc(data.list[10].main.temp)
                         weather.temp_4      = Celc(data.list[18].main.temp)
                         weather.temp_5      = Celc(data.list[26].main.temp)
                         weather.temp_6      = Celc(data.list[34].main.temp)
                    update(weather)
        
        }
            buttonF.addEventListener('click', ()=> {
                let weather = {} 
                let second  = data.list[4].dt_txt
                let third   = data.list[10].dt_txt
                let fourth  = data.list[18].dt_txt
                let fifth   = data.list[26].dt_txt
                         weather.icon        = data.list[0].weather[0].id
                         weather.icon_2      = data.list[5].weather[0].id
                         weather.icon_3      = data.list[13].weather[0].id
                         weather.icon_4      = data.list[21].weather[0].id
                         weather.icon_5      = data.list[29].weather[0].id
                         weather.humidity  = data.list[0].main.humidity
                         weather.loc       = data.city.name
                         weather.data_2    = new Date(second).toLocaleString('ru', options)
                         weather.data_3    = new Date(third).toLocaleString('ru', options)
                         weather.data_4    = new Date(fourth).toLocaleString('ru', options)
                         weather.data_5    = new Date(fifth).toLocaleString('ru', options)
                         weather.temp_1    = Faren(data.list[1].main.temp)
                         weather.temp_3    = Faren(data.list[10].main.temp)
                         weather.temp_4    = Faren(data.list[18].main.temp)
                         weather.temp_5    = Faren(data.list[26].main.temp)
                         weather.temp_6    = Faren(data.list[34].main.temp)
                    update(weather)
                })

            buttonC.addEventListener('click',()=>{
                    main()
                })
    main()
})
        }

const update = (weather) => {
    data_2.innerHTML      = weather.data_2
    data_3.innerHTML      = weather.data_3
    data_4.innerHTML      = weather.data_4
    data_5.innerHTML      = weather.data_5

    temp_1.innerHTML      = weather.temp_1   
    temp_3.innerHTML      = weather.temp_3
    temp_4.innerHTML      = weather.temp_4
    temp_5.innerHTML      = weather.temp_5
    temp_6.innerHTML      = weather.temp_6

    loc_1.innerHTML         = weather.loc
    icon.src                = 'img/' + weather.icon + '.svg'
    icon_2.src              = 'img/' + weather.icon_2 + '.svg'
    icon_3.src              = 'img/' + weather.icon_3 + '.svg'
    icon_4.src              = 'img/' + weather.icon_4 + '.svg'
    icon_5.src              = 'img/' + weather.icon_5 + '.svg'

    humidity_1.innerHTML  = weather.humidity
   
}  

const showPosition = (position) => {
    updateByGeo(position.coords.latitude, position.coords.longitude)
}
 
const updateByGeo = (lat, lon) => {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?'
    +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + key
    sendRequest(url) 
}

    window.addEventListener('load', ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition)
        } else {
            alert('No internet connection')
        } 
    })


   