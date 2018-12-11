'use strict'

import { clone } from 'lodash-es'

const lodash = { clone: clone }

export default {
  install: function(Vue : any) {
    Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
 }
}


