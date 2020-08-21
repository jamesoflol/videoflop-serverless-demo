import { createApp } from 'vue'
import App from './App.vue'

if (process.env.VUE_APP_API_GATEWAY_URL === 'https://1234asdf.execute-api.ap-southeast-2.amazonaws.com') {
  const error = 'You need to set the API Gateway URL - see "Frontend setup" in README.md'
  document.body.innerHTML = error
  throw new Error(error)
}

createApp(App).mount('#app')
