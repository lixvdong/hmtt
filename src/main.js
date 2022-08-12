import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Field, Form, Button, Notify, Tabbar, TabbarItem } from 'vant'
const vants = [NavBar, Field, Form, Button, Notify, Tabbar, TabbarItem]
vants.forEach(item => Vue.use(item))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
