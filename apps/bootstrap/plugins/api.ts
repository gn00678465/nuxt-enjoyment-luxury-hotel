export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token')
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: (config.app.apiUrl as string) || "http://localhost:3005",
    parseResponse: JSON.parse,
    onRequest({ request, options, error }) {
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    async onRequestError({ response }) {
      if (response?.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/'))
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})