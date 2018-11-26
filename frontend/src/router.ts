import Vue from 'vue'
import Router from 'vue-router'

import Login from './Login.vue'
import Users from './Users.vue'
import NotFound from './NotFound.vue'

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

export default router
