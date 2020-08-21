<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      Enter a video ID here: (e.g.: 1) <input v-model="videoId" v-on:keyUp="getFromServer()">
    </div>
    <br>
    <div v-if="videoRecord !== null">
      Video title: {{ videoRecord.title }}<br>
      Video description: {{ videoRecord.description }}<br>
      Video url: {{ videoRecord.url }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      videoId: '',
      videoRecord: null,
    };
  },
  methods: {
    async getFromServer () {
      const backendResponse = await fetch(process.env.VUE_APP_API_GATEWAY_URL + '/video/' + this.videoId);
      this.videoRecord = await backendResponse.json();
      console.log(this.videoRecord);
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
