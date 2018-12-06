import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from '@/store'

import Domains from '@/components/domains'
import NotFound from '@/components/not-found'
import Login from '@/components/login'



var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/domains'
        },
        {
            path: '/domains',
            component: Domains
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
