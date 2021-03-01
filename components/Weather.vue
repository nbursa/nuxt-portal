<template lang="pug">
.weather-container-small(v-cloak="")
  div(v-if="loading")
    p
  .weather-content(v-else)
    router-link.weather-link(
      tag="a",
      to="/weather",
      @mouseover.native="linkOver",
      @mouseleave.native="linkLeave"
    )
      p.title {{ location }}
      p.desc
        span
          img(:src="weatherIcon")
        span.temp {{ temp }}&deg;C
        span.description {{ desc }}
</template>

<script>
import axios from 'axios'

export default {
  name: 'Weather',
  data() {
    return {
      loading: true,
      lat: null,
      lon: null,
      location: null,
      temp: null,
      desc: null,
      weatherIcon: null,
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
          this.weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
          this.loading = false
        })
        .catch((e) => {
          console.error(e)
        })
    },
    linkOver(e) {
      this.$emit('linkOver', e)
    },
    linkLeave(e) {
      this.$emit('linkLeave', e)
    },
  },
}
</script>

<style lang="stylus" scoped>
.weather-container-small {
    max-width: 320px;
    text-align: center;
    padding: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    cursor: none;

    .weather-content {
      .weather-link {
        cursor: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          margin: 0;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    @media screen and (max-width: 550px) {
      .weather-content {
        .weather-link {
          .title,
          .description {
            display: none;
          }
        }
      }
    }
  }
</style>
