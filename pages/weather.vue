/* eslint-disable */
<template lang="pug">
.weather-container
  .weather-content
    h2.title {{ location }}
    .left-column
      .desc
        h3.temp
          img(:src='img' alt='Weather icon')
          span {{ temp }}&deg;C
        h3 {{ desc }}
    .right-column
      p
      h4 Low: {{ temp_low }}&deg;C
      h4 High: {{ temp_high }}&deg;C
      p
      p
      h5 Pressure: {{ pressure }}mb
      h5 Humidity: {{ humidity }}%
      p(style='margin:0')
      h5 Wind: {{ wind }}kmh
      p
    p
    h6
      | Weather data collected from:
      router-link(
        tag='a'
        to='https://openweathermap.org/'
        target='_blank'
        @mouseover.native='linkOver()'
        @mouseleave.native='linkLeave()'
      ) OpenWeatherMap API
    h6 {{ build }}
    p

</template>

<script>
import axios from 'axios'

export default {
  name: 'WeatherFull',
  data() {
    return {
      loading: true,
      lat: null,
      lon: null,
      location: null,
      temp: null,
      desc: null,
      code: null,
      pressure: null,
      temp_low: null,
      temp_high: null,
      humidity: null,
      img: '',
      wind: null,
      build: '',
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.lat = pos.coords.latitude
      this.lon = pos.coords.longitude
      this.loadWeather()
    })
  },
  beforeDestroy() {
    this.linkLeave()
  },
  methods: {
    loadWeather() {
      const requestString = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=e4331cc37f866b6b58af862892bb0263`
      axios
        .get(requestString)
        .then((res) => {
          const weather = res.data
          this.location = weather.name + ', ' + weather.sys.country
          this.temp = Math.round(weather.main.temp)
          this.temp_low = Math.round(weather.main.temp_min)
          this.temp_high = Math.round(weather.main.temp_max)
          this.desc = weather.weather[0].description
          this.humidity = weather.main.humidity
          this.pressure = weather.main.pressure
          this.img = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
          this.wind = weather.wind.speed
          this.loading = false
        })
        .catch((e) => {
          console.error(e)
        })
    },
    linkOver() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor.classList.add('btn-hover')
    },
    linkLeave() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor.classList.remove('btn-hover')
    },
  },
}
</script>
