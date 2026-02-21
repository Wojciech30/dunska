import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    password: localStorage.getItem('admin_password') || '',
    isAuthenticated: !!localStorage.getItem('admin_password'),
  }),
  actions: {
    async login(password) {
      try {
        const response = await axios.post('/api/settings/admin/login', { password })
        if (response.data.success) {
          this.password = password
          this.isAuthenticated = true
          localStorage.setItem('admin_password', password)
          return true
        }
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
      return false
    },
    logout() {
      this.password = ''
      this.isAuthenticated = false
      localStorage.removeItem('admin_password')
    },
  },
})

// Configure axios interceptor for admin password
axios.interceptors.request.use((config) => {
  const adminStore = useAdminStore()
  if (adminStore.password) {
    config.headers['x-admin-password'] = adminStore.password
  }
  return config
})
