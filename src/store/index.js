import Vue from 'vue'
import vuex from 'vuex'

// 导入各个模块
import tab from './tab'
import user from './user'

Vue.use(vuex)

export default new vuex.Store({
    modules: {
        tab: tab,
        user: user
    }
})