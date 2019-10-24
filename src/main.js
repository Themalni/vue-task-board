import Vue from 'vue'
import App from './App.vue'
import store from './store'

// Global CSS styles
import '@/assets/scss/style.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
