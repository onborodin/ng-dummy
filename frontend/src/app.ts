import './app.scss'

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import client from './client'
Vue.use(client)

import lodash from './lodash'
Vue.use(lodash)

import foundation from './foundation'

const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: function(h) {
                return h(App)
    },
    components: { App },
    mounted: function() {
        foundation(document)
    }
})
