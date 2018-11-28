import Vue from 'vue'
import Router from 'vue-router'

import Domains from './components/domains.vue'
import Login from './components/login.vue'
import Users from './components/users.vue'
import SuperUsers from './components/super-users.vue'
import NotFound from './components/not-found.vue'

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
            path: '/domains',
            component: Domains
        },
        {
            path: '/users',
            component: Users
        },
        {
            path: '/superusers',
            component: SuperUsers
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
