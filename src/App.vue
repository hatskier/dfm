<template>
  <div id="app">
    <div v-if="!Blockchain.pendingAuth && Blockchain.isUserSignedIn()">
      <NavBar/>
      <router-view class="view"></router-view>
    </div>
    <div v-if="!Blockchain.pendingAuth && !Blockchain.isUserSignedIn()">
      <SignIn/>
    </div>

    <div v-if="Blockchain.pendingAuth">
      <h4 class="centered">Authentication in progress...</h4>
    </div>
    
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import SignIn from './components/views/SignIn'
import Blockchain from './modules/blockchain'

Blockchain.checkAuth()

export default {
  name: 'app',
  data() {
    return {
      Blockchain
    }
  },
  components: {
    NavBar,
    SignIn
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
