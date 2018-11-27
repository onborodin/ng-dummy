import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Login.vue'
import Users from './components/Users.vue'
import NotFound from './components/NotFound.vue'

import store from './store'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/users',
            component: Users
        },
        {
            path: '/login',
            component: Login,
            meta: { public: true }
        },
        {
            path: '*',
            component: NotFound,
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.public) {
        next()
    } else {
        if (store.state.auth == false) {
            next('/login')
        } else {
            next()
        }
    }
})

export default router
