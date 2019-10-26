import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'vue-awesome/icons/times'
import Icon from 'vue-awesome/components/Icon'
import uuidv1 from 'uuid/v1'
import VeeValidate, { Validator } from 'vee-validate'

// Global CSS styles
import '@/assets/scss/style.scss'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)
Vue.use(uuidv1)

const dictionary = {
  pl: {
    messages: {
      _default: (field) => `Pole ${field} zawiera błąd`,
      required: (field) => `${field} jest wymagany`
    }
  }
}

Validator.localize(dictionary)
Validator.localize('pl')

Vue.use(VeeValidate, {
  locale: 'pl',
  events: 'change|blur',
  inject: false
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
