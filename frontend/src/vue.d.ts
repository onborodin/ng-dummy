declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $client: any,
    $lodash: any
    $foundation: any
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $client: any,
    $lodash: any
    $foundation: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $client?: any,
    $lodash?: any
    $foundation?: any
  }
}
