console.log('working')
requestUrl =
  //   'https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=b47cbc5dede4579f5550da5d2bb84dc3'
  fetch(requestUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log('Fetch Response \n-------------')
      console.log(data)
    })
