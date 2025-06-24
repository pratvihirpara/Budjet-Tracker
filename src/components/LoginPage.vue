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
        <h2>Welcome back</h2>
        <p class="auth-subtitle">Enter your credentials to access your account</p>
      </div>

      <form @submit.prevent="login" class="auth-form">
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
          <div class="label-row">
            <label for="password">Password</label>
            <router-link to="/forgot-password" class="forgot-link">Forgot password?</router-link>
          </div>
          <input 
            v-model="password" 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            autocomplete="current-password"
            class="form-input"
          />
        </div>

        <button type="submit" class="auth-button">
          <span>Login</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">or continue with</span>
          <span class="divider-line"></span>
        </div>

        <button @click="loginWithGoogle" type="button" class="google-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
            <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
            <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.6055 17.5455 13.3575 18 12 18C9.39902 18 7.19052 16.3415 6.35852 14.027L3.09752 16.5395C4.75252 19.778 8.11352 22 12 22Z" fill="#4CAF50"/>
            <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2555 15.1185 16.536 16.083 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
          </svg>
          <span>Continue with Google</span>
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
        <p>Don't have an account? <router-link to="/signup" class="auth-link">Sign up</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Invalid email or password'
  }
}

async function loginWithGoogle() {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Google sign-in failed. Please try again.'
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

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
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

.forgot-link {
  font-size: 0.875rem;
  color: #2563EB;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #1D4ED8;
  text-decoration: underline;
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
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
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

.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #BFDBFE;
}

.divider-text {
  font-size: 0.875rem;
  color: #6B7280;
}

.google-button {
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: white;
  color: #374151;
  border: 1px solid #BFDBFE;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.google-button:hover {
  background-color: #F9FAFB;
  border-color: #93C5FD;
  transform: translateY(-2px);
}

.google-button:active {
  transform: translateY(0);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #DC2626;
  font-size: 0.9375rem;
  padding: 1rem;
  background-color: #FEF2F2;
  border-radius: 0.75rem;
  margin-top: 1rem;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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