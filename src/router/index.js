import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import EmployeeView from '../views/employee/EmployeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path:'/employee',
      name: 'employee',
      component: EmployeeView
    }
  ]
})

export default router
