import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMdl from 'vue-mdl'
import Mdl from 'material-design-lite'

import App from './App.vue'

import Contacts from './components/views/Contacts.vue'
import Dashboard from './components/views/Dashboard.vue'
import Debts from './components/views/Debts.vue'
import Incomings from './components/views/Incomings.vue'
import ShoppingList from './components/views/ShoppingList.vue'
import ShoppingLists from './components/views/ShoppingLists.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMdl)

Vue.directive('mdl', {
  inserted: el => Mdl.componentHandler.upgradeElement(el)
})

const routes = [
  { path: '/contacts', component: Contacts },
  { path: '/', component: Debts },
  { path: '/dashboard', component: Dashboard },
  { path: '/debts', component: Debts },
  { path: '/debts/:contact', component: Debts },
  { path: '/incomings', component: Incomings },
  { path: '/shop-list', component: ShoppingList },
  { path: '/shop-lists', component: ShoppingLists },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default app
