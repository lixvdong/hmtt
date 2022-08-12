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
  CellGroup,
  Image,
  DatetimePicker,
  Divider,
  Dialog
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
  CellGroup,
  Image,
  DatetimePicker,
  Divider,
  Dialog
]
vants.forEach(item => Vue.use(item))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
