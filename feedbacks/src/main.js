// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSessionStorage from 'vue-sessionstorage'
Vue.use(VueSessionStorage)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPencilAlt, faTrashAlt, faEye)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.employeeionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
