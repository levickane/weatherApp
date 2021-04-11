function getMainWeather(cityName) {
  fetch(`  https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b47cbc5dede4579f5550da5d2bb84dc3
  `)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
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

var searchButton = $('#searchButton')
var clearSearch = $('#searchBar')
searchButton.on('click', () => {
  var searchBar = $('#searchBar').val()
  console.log(searchBar)
  getMainWeather(searchBar)
  clearSearch.val('')
})

var currentDate = $('.currentDate')
var calDate = moment().format('L')
currentDate.append('(' + calDate + ')')

// fiveDayUrl =
//   'https://api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&appid=b4517ea4bf1f27c0c8cf8f291109a997'

// function get5DayForecast() {
//   fetch(fiveDayUrl)
//     .then(function (response) {
//       return response.json()
//     })
//     .then(function (data) {
//       console.log(data)
//     })
// }

// get5DayForecast()
