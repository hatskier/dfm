<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div id="nav-bar">
    <!-- <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header"> -->
    <div class="mdl-layout mdl-layout--fixed-header">
      <div class="mdl-layout__header navbarcolour">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <!-- <span class="mdl-layout-title"><img class="logo" src="../../public/logo.svg" height="48px"/>Homelink</span> -->
          <span class="mdl-layout-title"><img class="logo" src="../assets/logo.png"></span>
          <!-- Add spacer, to align navigation to the right -->
          
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <NavBarLink name="debts" defaultRoute/>
            <NavBarLink name="contacts"/>
            <!-- <NavBarLink name="dashboard" defaultRoute/> -->
            <NavBarLink name="shop-lists"/>
          </nav>

          <div class="mdl-layout-spacer"></div>

          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <div class="mdl-layout-spacer"></div>

            Hi, {{ userName }}

            <a
              class="mdl-navigation__link"
              v-on:click="signOut"
            >
              Sign out
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import NavBarLink from './NavBarLink.vue';
import Blockchain from '../modules/blockchain'

export default {
  name: "NavBar",
  data() {
    return {
      userName: Blockchain.getUserName()
    }
  },
  computed: {
    path() {
      return this.$route.fullPath
    }
  },
  components: {
    NavBarLink
  },
  methods: {
    signOut() {
      Blockchain.signOut()
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
  text-decoration: none;
}

.logo {
  height: 60px;
}

.selected {
 font-weight: 500 !important;
 color: #FFF;
 opacity: 1;
 background-color: #1c587a;
}

.mdl-navigation__link {
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight:300;
}

.mdl-navigation__link:hover {
  background-color: #114462;
  transition: 0.3s;
}
</style>
