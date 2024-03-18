import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RequestView from '../views/employee/RequestView.vue'
import EmployeeView from '../views/employee/EmployeeView.vue'
import AnswsersView from '../views/employee/AnswersView.vue'
import AssistanceView from '../views/employee/AssistanceView.vue'
import { useTokenStore } from '../stores/token';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path:'/employee',
      name: 'employee',
      component: EmployeeView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'EMPLOYEE'){
          alert("you are not authorized")
          return false
        }
      }
    },
    {
      path:'/employee/request',
      name: 'request',
      component: RequestView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'EMPLOYEE'){
          alert("you are not authorized")
          return false
        }
      }
    },
    {
      path:'/employee/answers',
      name: 'answsers',
      component: AnswsersView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'EMPLOYEE'){
          alert("you are not authorized")
          return false
        }
      }
    },
    {
      path:'/employee/assistance',
      name: 'assistance',
      component: AssistanceView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'EMPLOYEE'){
          alert("you are not authorized")
          return false
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useTokenStore();
  if (to.name !== 'Login' && store.getToken() == null) next({ name: 'Login' })
  else next()
})


export default router
