import Vue from 'vue'
import App from './App.vue'
import router from '../router'

// 引入less文件
import './assets/less/index.less'
// 引入vuex
import store from './store'

Vue.config.productionTip = false

// 按需导入element-ui库
import { Button, Row, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownMenu, DropdownItem, Card, Col, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Select, Switch, DatePicker, Dialog, Option, Input, Pagination, MessageBox, Message, Carousel, CarouselItem } from 'element-ui'	// 按需引入

// 导入axios
import axios from 'axios'

// 引入mock
import '../api/mock'





Vue.use(Button)
Vue.use(Row)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(CarouselItem)


// 直接把axios弄到vue原型上
Vue.prototype.$http = axios

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

router.beforeEach((to, form, next) => {
  store.commit("user/getToken")//防止更新后丢失信息
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })//
  } else if (token && to.name === 'login') {
    next({ name: 'home' })//如果已经登录过了就直接去home页面
  } else {
    next()
  }

})


new Vue({
  router: router,
  store: store,
  render: h => h(App),
  created() {
    this.$store.commit('tab/addMenu', this.$router)//防止刷新出现白屏的问题
  }
}).$mount('#app')
