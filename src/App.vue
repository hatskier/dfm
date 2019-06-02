<template>
  <div id="app">
    <NavBar/>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar' 

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  @import "~material-design-lite/material.css";
  @import '~material-icons/iconfont/material-icons.css';

  .material-icons {
    color: #1c587a;
  }

  .mdl-button--colored {
    background: #cff3ff;
  }

  .centered {
    margin: auto;
    text-align: center;
  }
</style>
