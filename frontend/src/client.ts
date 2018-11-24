'use strict'

import axios from 'axios'

const client = function(url : string, params: object) : any {
        return axios.post(url, { params: params })
}

export default {
  install: function(Vue : any) {
    Object.defineProperty(Vue.prototype, '$client', { value: client })
 }
}

//export default client

