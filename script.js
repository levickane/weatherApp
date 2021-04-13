var currentDate = $('.currentDate')
var calDate = moment().format('L')
currentDate.append('(' + calDate + ')')

function getMainWeather(cityName) {
  fetch(`  https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b47cbc5dede4579f5550da5d2bb84dc3
  `)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      var featuredCityName = $('.featuredCityName')
      var featuredTemp = $('.featuredTemp')
      var featuredHumidity = $('.featuredHumidity')
      var featuredWind = $('.featuredWind')
      var weatherIcon = $('.weatherIcon')
      featuredCityName.text('')
      featuredTemp.text('')
      featuredHumidity.text('')
      featuredWind.text('')
      weatherIcon.text('')

      var kelvinTemp = data.main.temp
      var fTemp = ((kelvinTemp - 273.15) * 1.8 + 32).toFixed(1)
      var mph = (data.wind.speed * 2.24).toFixed(1)
      var weatherIconImg = data.weather[0].icon

      var sunny = $('<i class="bi bi-brightness-high"></i>')
      var moon = $('<i class="bi bi-moon-stars"></i>')
      var sunnyWithCloud = $('<i class="bi bi-cloud-sun"></i>')
      var cloudy = $('<i class="bi bi-cloud-fill"></i>')
      var heavyClouds = $('<i class="bi bi-clouds-fill"></i>')
      var foggy = $('<i class="bi bi-cloud-haze"></i>')
      var snow = $('<i class="bi bi-snow2"></i>')
      var rain = $('<i class="bi bi-cloud-rain"></i>')
      var thunder = $('<i class="bi bi-cloud-lightning-rain-fill"></i>')

      if (weatherIconImg == '01d') {
        weatherIcon.append(sunny)
      } else if (weatherIconImg == '01n') {
        weatherIcon.append(moon)
      } else if (weatherIconImg == '02n' || weatherIconImg == '02d') {
        weatherIcon.append(sunnyWithCloud)
      } else if (weatherIconImg == '03n' || weatherIconImg == '03d') {
        weatherIcon.append(cloudy)
      } else if (weatherIconImg == '04n' || weatherIconImg == '04d') {
        weatherIcon.append(heavyClouds)
      } else if (weatherIconImg == '50n' || weatherIconImg == '50d') {
        weatherIcon.append(foggy)
      } else if (weatherIconImg == '13n' || weatherIconImg == '13d') {
        weatherIcon.append(snow)
      } else if (weatherIconImg == '09n' || weatherIconImg == '09d') {
        weatherIcon.append(rain)
      } else if (weatherIconImg == '11n' || weatherIconImg == '11d') {
        weatherIcon.append(thunder)
      }

      featuredCityName.append(data.name)
      featuredTemp.append(fTemp)
      featuredHumidity.append(data.main.humidity)
      featuredWind.append(mph)
    })
}

function getUvAnd5Day(cityName) {
  fetch(
    `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${cityName}&language=en`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '39525a19f1msh8bd69ea75c04185p1e6577jsn06c9ca822fcc',
        'x-rapidapi-host': 'google-maps-geocoding.p.rapidapi.com'
      }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      var latitude = data.results[0].geometry.location.lat
      var longitude = data.results[0].geometry.location.lng
      return { latitude: latitude, longitude: longitude }
    })
    .then((coordinates) => {
      var lat = coordinates.latitude
      var lng = coordinates.longitude
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=b47cbc5dede4579f5550da5d2bb84dc3`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          var highlightedUV = $('.highlightedUV')
          highlightedUV.text('')
          var uvIndex = data.current.uvi
          highlightedUV.append(uvIndex)
          if (uvIndex < 3) {
            highlightedUV.attr('style', 'background-color: green')
          } else if (uvIndex < 6) {
            highlightedUV.attr('style', 'background-color: yellow')
          } else if (uvIndex < 8) {
            highlightedUV.attr('style', 'background-color: orange')
          } else if (uvIndex < 11) {
            highlightedUV.attr('style', 'background-color: red')
          } else {
            highlightedUV.attr('style', 'background-color: purple')
          }
          //implement the 5day forecast here
          fiveDayList = data.daily
          fiveDayDate = $('.fiveDayDate')
          fiveDayDateArray = []
          fiveDayTemp = $('.tempCard')
          fiveDayTempArray = []
          fiveDayHumidity = $('.humidityCard')
          fiveDayHumidityArray = []
          fiveDayWeatherIcon = $('.fiveDayWeatherIcon')
          fiveDayWeatherIconArray = []
          fiveDayDate.text('')
          fiveDayTemp.text('')
          fiveDayHumidity.text('')
          fiveDayWeatherIcon.text('')
          for (var i = 0; i < 5; i++) {
            var dayDate = moment(fiveDayList[i].dt_txt).format('L')
            fiveDayDateArray.push(dayDate)

            var kelvinTemp = data.daily[i].temp.day
            var fTemp = ((kelvinTemp - 273.15) * 1.8 + 32).toFixed(1)
            fiveDayTempArray.push(fTemp)
            var humidity = data.daily[i].humidity
            fiveDayHumidityArray.push(humidity)
            var weatherIconImg = data.daily[i].weather[0].icon
            fiveDayWeatherIconArray.push(weatherIconImg)
          }
          for (var i = 0; i < fiveDayDateArray.length; i++) {
            fiveDayDate[i].textContent = fiveDayDateArray[i]
            fiveDayTemp[i].textContent = fiveDayTempArray[i]
            fiveDayHumidity[i].textContent = fiveDayHumidityArray[i]

            var sunny = $('<i class="bi bi-brightness-high"></i>')[0]
            var moon = $('<i class="bi bi-moon-stars"></i>')[0]
            var sunnyWithCloud = $('<i class="bi bi-cloud-sun"></i>')[0]
            var cloudy = $('<i class="bi bi-cloud-fill"></i>')[0]
            var heavyClouds = $('<i class="bi bi-clouds-fill"></i>')[0]
            var foggy = $('<i class="bi bi-cloud-haze"></i>')[0]
            var snow = $('<i class="bi bi-snow2"></i>')[0]
            var rain = $('<i class="bi bi-cloud-rain"></i>')[0]
            var thunder = $(
              '<i class="bi bi-cloud-lightning-rain-fill"></i>'
            )[0]
            if (fiveDayWeatherIconArray[i] == '01d') {
              fiveDayWeatherIcon[i].append(sunny)
            } else if (fiveDayWeatherIconArray[i] == '01n') {
              fiveDayWeatherIcon[i].append(moon)
            } else if (
              fiveDayWeatherIconArray[i] == '02n' ||
              fiveDayWeatherIconArray[i] == '02d'
            ) {
              fiveDayWeatherIcon[i].append(sunnyWithCloud)
            } else if (
              fiveDayWeatherIconArray[i] == '03n' ||
              fiveDayWeatherIconArray[i] == '03d'
            ) {
              fiveDayWeatherIcon[i].append(cloudy)
            } else if (
              fiveDayWeatherIconArray[i] == '04n' ||
              fiveDayWeatherIconArray[i] == '04d'
            ) {
              fiveDayWeatherIcon[i].append(heavyClouds)
            } else if (
              fiveDayWeatherIconArray[i] == '50n' ||
              fiveDayWeatherIconArray[i] == '50d'
            ) {
              fiveDayWeatherIcon[i].append(foggy)
            } else if (
              fiveDayWeatherIconArray[i] == '13n' ||
              fiveDayWeatherIconArray[i] == '13d'
            ) {
              fiveDayWeatherIcon[i].append(snow)
            } else if (
              fiveDayWeatherIconArray[i] == '09n' ||
              fiveDayWeatherIconArray[i] == '09d' ||
              fiveDayWeatherIconArray[i] == '10n' ||
              fiveDayWeatherIconArray[i] == '10d'
            ) {
              fiveDayWeatherIcon[i].append(rain)
            } else if (
              fiveDayWeatherIconArray[i] == '11n' ||
              fiveDayWeatherIconArray[i] == '11d'
            ) {
              fiveDayWeatherIcon[i].append(thunder)
            } else {
              console.log(`unknown ${fiveDayWeatherIconArray[i]}`)
            }
          }
        })
    })
}

var searchButton = $('#searchButton')
var clearSearch = $('#searchBar')
var historyUl = $('.historyUl')
searchButton.on('click', () => {
  var searchBar = $('#searchBar').val()

  getMainWeather(searchBar)
  getUvAnd5Day(searchBar)
  const historyArray = JSON.parse(localStorage.getItem('searchHistory')) ?? []
  historyArray.push(searchBar)
  localStorage.setItem('searchHistory', JSON.stringify(historyArray))
  setSearchHistoryLi(searchBar)
  clearSearch.val('')
})

const historyArray = JSON.parse(localStorage.getItem('searchHistory')) ?? []
for (let searchBar of historyArray) {
  setSearchHistoryLi(searchBar)
}

function setSearchHistoryLi(searchBar) {
  var newLi = $(`<li class="list-group-item historyLi">`)
  newLi.html(searchBar)
  historyUl.append(newLi)
  newLi.on('click', () => {
    getMainWeather(searchBar)
    getUvAnd5Day(searchBar)
  })
}
