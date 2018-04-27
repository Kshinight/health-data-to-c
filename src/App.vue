<template>
  <div id="app">
    <QS-header></QS-header>
    <bground></bground>
    <router-view></router-view>

  </div>
</template>

<script>
  import QSHeader from './components/QSheader.vue'
  import bground from './components/bground.vue'
  export default {
    name: 'app',
    components: {
      bground,
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
    background: linear-gradient(#5fcaff,#ddf4ff);
  }

</style>
