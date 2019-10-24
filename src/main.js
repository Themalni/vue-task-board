import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'vue-awesome/icons/times'
import Icon from 'vue-awesome/components/Icon'

// Global CSS styles
import '@/assets/scss/style.scss'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
