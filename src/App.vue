<template>
  <div id="app">
    <QS-header></QS-header>
    <router-view></router-view>

  </div>
</template>

<script>
  import QSHeader from './components/QSheader.vue'
  export default {
    name: 'app',
    components: {
      QSHeader
    }
  }
</script>

<style >
  * {
    padding: 0;
    margin: 0;
  }
  html {
    height: 100%;
    font-size: 62.5%;
  }
  body {
    height: 100%;
    font-size: 1.4rem;
  }
  #app {
    height: 100%;
    overflow: auto;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    background-color: #efefef;
  }

</style>
