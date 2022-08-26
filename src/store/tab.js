
import Cookie from "js-cookie";


export default {
    namespaced: true,
    state: {
        isCollapse: false,
        // tabsList可以拿来渲染面包屑和tag属性
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home',
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name);
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, val) {
            state.tabsList = state.tabsList.filter(item => item.name !== val)
        },




        setMenu(state, val) {
            state.menu = val;
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 动态添加路由
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, 'menuArray')
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('main', item)//第一个参数是父路由的name
            })
        }
    }
}