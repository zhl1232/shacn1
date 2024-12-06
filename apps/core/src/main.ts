import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import components from '@ys/components'
import '@ys/components/assets/index.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(components)
app.mount('#app')
