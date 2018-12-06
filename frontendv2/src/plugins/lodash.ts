'use strict'

import { clone, has } from 'lodash-es'

const lodash = {
    clone: clone,
    has: has
}

export default {
  install: function(Vue : any) {
    Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
 }
}


