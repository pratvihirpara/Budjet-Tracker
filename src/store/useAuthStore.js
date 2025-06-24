import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,
  }),
  actions: {
    signup(name, email, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.email === email)) {
        throw new Error('User already exists')
      }
      const user = { name, email, password }
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
      this.isAuthenticated = true
      this.currentUser = { name, email }
    },
    login(email, password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === email && u.password === password)
      if (!user) throw new Error('Invalid credentials')
      this.isAuthenticated = true
      this.currentUser = { name: user.name, email }
    },
    logout() {
      this.isAuthenticated = false
      this.currentUser = null
    }
  }
})