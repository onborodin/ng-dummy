'use strict'

import axios from 'axios'
import { v4 as uuid } from 'uuid'

var client = function(uri :string, method :string, params : any) {
        return axios
            .post(uri, {
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: uuid()
            })
}

export default {
  install: function(Vue : any) {
    Object.defineProperty(Vue.prototype, '$client', { value: client })
  }
}
