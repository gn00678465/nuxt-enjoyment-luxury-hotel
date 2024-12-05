import type { AuthEntry } from '~/types';
import { fetchUserData } from '~/api'

export const useAuthStore = defineStore('auth-store', () => {
  
  const router = useRouter()

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
      const res = await fetchUserData({
        headers: {
          authorization: `Bearer ${token.value}`
        }
      })
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