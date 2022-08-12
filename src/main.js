import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import direct from './dieectives/fofo'
import {
  NavBar,
  Field,
  Form,
  Button,
  Notify,
  Tabbar,
  TabbarItem,
  Icon,
  Cell,
  PullRefresh,
  ActionSheet,
  Popup,
  Row,
  Col,
  Badge,
  Search,
  List,
  Tab,
  Tabs,
  Tag,
  CellGroup
} from 'vant'
const vants = [
  NavBar,
  Field,
  Form,
  Button,
  Notify,
  Tabbar,
  TabbarItem,
  Icon,
  Cell,
  PullRefresh,
  ActionSheet,
  Popup,
  Row,
  Col,
  Badge,
  Search,
  List,
  Tab,
  Tabs,
  direct,
  Tag,
  CellGroup
]
vants.forEach(item => Vue.use(item))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
