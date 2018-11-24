'use strict'

import * as lodash from 'lodash-es'

export default {
  install: function(Vue : any) {
    Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
 }
}


