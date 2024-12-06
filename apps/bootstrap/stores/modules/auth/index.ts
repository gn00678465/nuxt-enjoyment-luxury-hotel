import type { AuthEntry } from '~/types';

export const useAuthStore = defineStore('auth-store', () => {
  
  const router = useRouter()
  const { $api } = useNuxtApp()

  const token = useCookie('token')
  const userData = ref<AuthEntry['result']>()

  function setToken(t: string) {
    token.value = t
  }

  function setUserData(data: AuthEntry['result']) {
    userData.value = data
  }

  function logout() {
    token.value = undefined
    userData.value = undefined
    router.push('/')
  }

  async function getUserData() {
    if (token.value && !userData.value) {
      const res = await $api<AuthEntry>('/api/v1/user/')
      userData.value = res.result
    }
  }

  getUserData()

  return {
    token: token,
    setToken,
    userData: userData,
    setUserData,
    logout,
    getUserData
  }
})