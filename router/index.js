import Vue from 'vue'
import VueRouter from 'vue-router'
import MyMain from '../views/Main'
import MyUser from '../views/user/User.vue'
import MyHome from '../views/home/Home.vue'
import MyMall from '../views/mall/Mall.vue'
import MyPageOne from '../views/Other/PageOne.vue'
import MyPageTwo from '../views/Other/PageTwo.vue'
import MyLogin from '../views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'main',
        path: '/',
        component: MyMain,
        children: [
            // 这块通过vuex里面的tab中的addMenu动态添加
            // {
            //     name: 'home',
            //     path: '/home',
            //     component: MyHome
            // },


            // {
            //     name: 'user',
            //     path: '/user',
            //     component: MyUser
            // },
            // {
            //     name: 'mall',
            //     path: '/mall',
            //     component: MyMall,
            // },
            // {
            //     name: 'page1',
            //     path: '/page1',
            //     component: MyPageOne,
            // },
            // {
            //     name: 'page2',
            //     path: '/page2',
            //     component: MyPageTwo,
            // }
        ]

    },
    {
        name: 'login',
        path: '/login',
        component: MyLogin
    }
]

// 解决重复点击一个路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
    if (resolve && reject) {
        originalPush.call(this, location, resolve, reject)
    } else {
        originalPush.call(this, location, () => { }, () => { })

    }
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location, resolve, reject) {
    if (resolve && reject) {
        originalReplace.call(this, location, resolve, reject)
    } else {
        originalReplace.call(this, location, () => { }, () => { })

    }
}

const router = new VueRouter({
    mode: 'history',
    routes,

})


export default router