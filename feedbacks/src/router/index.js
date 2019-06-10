import Vue from 'vue'
import Router from 'vue-router'
import Employees from '@/components/Employees'
import AdminEmployees from '@/components/AdminEmployees'
import AdminEmployeePage from '@/components/AdminEmployeePage'

Vue.use(Router)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BButton, BModal, VBModal } from 'bootstrap-vue'
Vue.component('b-button', BButton)
Vue.component('b-modal', BModal)
Vue.directive('b-modal', VBModal)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/admin/',
      name: 'AdminEmployees',
      component: AdminEmployees
    },
    {
      path: '/admin/employee/:id',
      name: 'AdminEmployeePage',
      component: AdminEmployeePage
    }
  ]
})
