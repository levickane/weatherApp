console.log('working')
requestUrl =
  'https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=b47cbc5dede4579f5550da5d2bb84dc3'
fetch(requestUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data)
    var kelvinTemp = data.main.temp
    var fTemp = ((kelvinTemp - 273.15) * 1.8 + 32).toFixed(1)
    var mph = (data.wind.speed * 2.24).toFixed(1)
    var cloudSun = data.clouds.all

    var featuredCityName = $('.featuredCityName')
    var featuredTemp = $('.featuredTemp')
    var featuredHumidity = $('.featuredHumidity')
    var featuredWind = $('.featuredWind')
    var weatherIcon = $('.weatherIcon')

    var cloudy = $('<i class="bi bi-cloud-fill"></i>')
    var cloudyWithSun = $('<i class="bi bi-cloud-sun-fill"></i>')
    var sunnyWithCloud = $('<i class="bi bi-cloud-sun"></i>')
    var sunny = $('<i class="bi bi-brightness-high"></i>')

    //finish these icons and use the if statment to check on the
    //icon code number. Example: 11d or 13d or 10d or 09d etc

    if (cloudSun > 75) {
      weatherIcon.append(cloudy)
    } else if (cloudSun <= 75 && cloudSun > 50) {
      weatherIcon.append(cloudyWithSun)
    } else if (cloudSun <= 50 && cloudSun > 25) {
      weatherIcon.append(sunnyWithCloud)
    } else if (cloudSun <= 25) {
      weatherIcon.append(sunny)
    }

    featuredCityName.append(data.name)
    featuredTemp.append(fTemp)
    featuredHumidity.append(data.main.humidity)
    featuredWind.append(mph)
    // weatherIcon.append(data.weather[0].icon)
  })
console.log(moment().calendar())
var currentDate = $('.currentDate')
var calDate = moment().format('L')
currentDate.append('(' + calDate + ')')
