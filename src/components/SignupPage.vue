<template>
  <div class="auth-container">
    <div class="auth-background"></div>
    <div class="auth-box">
      <div class="auth-header">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="auth-logo">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M12 8V14M12 8H12.01M12 8H11.99" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="logoGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2563EB"/>
              <stop offset="1" stop-color="#3B82F6"/>
            </linearGradient>
          </defs>
        </svg>
        <h2>Create your account</h2>
        <p class="auth-subtitle">Get started with BudgetTracker in minutes</p>
      </div>

      <form @submit.prevent="signup" class="auth-form">
        <div class="input-group">
          <label for="name">Full Name</label>
          <input 
            v-model="name" 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            required 
            autocomplete="name"
            class="form-input"
          />
        </div>
        
        <div class="input-group">
          <label for="email">Email</label>
          <input 
            v-model="email" 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            required 
            autocomplete="email"
            class="form-input"
          />
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            v-model="password" 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            autocomplete="new-password"
            class="form-input"
          />
          <div class="password-strength">
            <div class="strength-meter">
              <div class="strength-bar" :class="passwordStrength"></div>
            </div>
            <p class="password-hint">Use at least 8 characters with a mix of letters, numbers & symbols</p>
          </div>
        </div>

        <button type="submit" class="auth-button">
          <span>Create Account</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <transition name="fade">
          <div v-if="error" class="error-message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ error }}</span>
          </div>
        </transition>
      </form>

      <div class="auth-footer">
        <p>Already have an account? <router-link to="/login" class="auth-link">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const passwordStrength = computed(() => {
  if (!password.value) return 'empty'
  if (password.value.length < 4) return 'weak'
  if (password.value.length < 8) return 'medium'
  return 'strong'
})

async function signup() {
  error.value = ''
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(userCredential.user, { displayName: name.value })
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message || 'Signup failed. Please try again.'
  }
}
</script>

<style scoped>
.auth-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%);
  z-index: -1;
}

.auth-background::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.auth-box {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.auth-box:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  margin-bottom: 1rem;
}

.auth-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: #4B5563;
  font-size: 1rem;
  margin: 0;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1E40AF;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 1px solid #BFDBFE;
  border-radius: 0.75rem;
  background-color: rgba(239, 246, 255, 0.5);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #93C5FD;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.5);
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-meter {
  height: 4px;
  background-color: #E5E7EB;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  width: 0;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-bar.empty {
  width: 0;
  background-color: transparent;
}

.strength-bar.weak {
  width: 33%;
  background-color: #EF4444;
}

.strength-bar.medium {
  width: 66%;
  background-color: #F59E0B;
}

.strength-bar.strong {
  width: 100%;
  background-color: #10B981;
}

.password-hint {
  font-size: 0.8125rem;
  color: #6B7280;
  margin: 0;
}

.auth-button {
  width: 100%;
  padding: 1rem 1.25rem;
  background: linear-gradient(45deg, #2563EB, #3B82F6);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.auth-button:hover {
  background: linear-gradient(45deg, #1D4ED8, #2563EB);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
}

.auth-button:active {
  transform: translateY(0);
}

.auth-button svg {
  transition: transform 0.2s ease;
}

.auth-button:hover svg {
  transform: translateX(3px);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #FEE2E2;
  color: #DC2626;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.error-message svg {
  flex-shrink: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.auth-footer {
  text-align: center;
  font-size: 0.9375rem;
  color: #4B5563;
  padding-top: 1.5rem;
  border-top: 1px solid #BFDBFE;
}

.auth-link {
  color: #2563EB;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: #1D4ED8;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-box {
    padding: 1.75rem;
  }
  
  .auth-header h2 {
    font-size: 1.5rem;
  }
}
</style>