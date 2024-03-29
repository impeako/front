import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RequestView from '../views/employee/RequestView.vue'
import EmployeeView from '../views/employee/EmployeeView.vue'
import AnswsersView from '../views/employee/AnswersView.vue'
import AssistanceView from '../views/employee/AssistanceView.vue'
import AdminView from '../views/Admin/AdminView.vue'
import DashboardView from '../views/Admin/DashboardView.vue'
import HrView from '../views/Hr/HrView.vue'
import DocumentsView from '../views/Hr/DocumentsView.vue'
import { useTokenStore } from '../stores/token';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },

    // employee view
    {
      path:'/employee',
      name: 'employee',
      component: EmployeeView,
    },
    {
      path:'/employee/request',
      name: 'request',
      component: RequestView,
    },
    {
      path:'/employee/answers',
      name: 'answsers',
      component: AnswsersView,
    },
    {
      path:'/employee/assistance',
      name: 'assistance',
      component: AssistanceView,
    },
    {
      path:'/admin/user-managemnt',
      name: 'admin',
      component: AdminView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'ADMIN'){
          alert("you are not authorized")
          return ('/employee')
        }
      }
    },
    {
      path:'/admin/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'ADMIN'){
          alert("you are not authorized")
          return ('/employee')
        }
      }
    },
    {
      path:'/hr/requests-treatment',
      name: 'requests treatment',
      component: HrView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'HR'){
          alert("you are not authorized")
          return ('/employee')
        }
      }
    },
    {
      path:'/hr/documents-management',
      name: 'Documents management',
      component: DocumentsView,
      beforeEnter(to){
        const store = useTokenStore();
        if(store.getRole() !== 'HR'){
          alert("you are not authorized")
          return ('/employee')
        }
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = useTokenStore();
  if (to.name !== 'Login' && store.isAuthenticated == false) next({ name: 'Login' })
  else next()
})


export default router
