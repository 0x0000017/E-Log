<template>
  <div class="row">
    <div class="col-2">
      <SideBar />
    </div>
    <div class="col">
      <router-view/>
    </div>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');

  #app {
    font-family: 'Gothic A1', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #F6F6F9;
    background-image: linear-gradient(to bottom, #22222f, #2d2d38, #393941, #45454a, #515153);
    min-height: 100vh;
  }

  .container {
    padding-top: 2vw;
  }
  
</style>

<script>
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    SideBar,
  }
}

</script>
