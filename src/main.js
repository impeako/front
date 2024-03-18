import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia'
import { useTokenStore } from './stores/token'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

const store = useTokenStore()
store.initializeAuth()

app.mount('#app')


