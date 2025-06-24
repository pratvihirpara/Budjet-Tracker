<template>
  <div class="welcome-container">
    <div class="welcome-background"></div>
    <div class="welcome-content">
      <div class="hero-section">
        <div class="logo">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M12 8V14M12 8H12.01M12 8H11.99" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="logoGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2563EB"/>
                <stop offset="1" stop-color="#3B82F6"/>
              </linearGradient>
            </defs>
          </svg>
          <h1>BudgetTracker</h1>
        </div>
        <h2>Take Control of Your Finances</h2>
        <p class="subtitle">Track expenses, set budgets, and achieve your financial goals with our intuitive platform</p>
      </div>

      <div class="auth-actions">
        <router-link to="/login" class="auth-button primary">
          <span>Get Started</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        <router-link to="/signup" class="auth-button secondary">
          <span>Create Account</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 8V14M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>

      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#featureGradient1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V12L15 15" stroke="url(#featureGradient1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="featureGradient1" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1D4ED8"/>
                  <stop offset="1" stop-color="#3B82F6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3>Real-time Tracking</h3>
          <p>Monitor your expenses and income as they happen with instant updates</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20V10M18 20V4M6 20V16" stroke="url(#featureGradient2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="featureGradient2" x1="6" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#3B82F6"/>
                  <stop offset="1" stop-color="#93C5FD"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3>Visual Reports</h3>
          <p>Beautiful charts to understand your spending patterns and trends</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#featureGradient3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16V12M12 8H12.01" stroke="url(#featureGradient3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="featureGradient3" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2563EB"/>
                  <stop offset="1" stop-color="#60A5FA"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3>Budget Alerts</h3>
          <p>Get notified when you're approaching your spending limits</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
}

.welcome-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%);
  z-index: -1;
}

.welcome-background::before {
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

.welcome-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

.hero-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: fadeInUp 0.8s ease-out;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.logo h1 {
  font-size: 2.75rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.025em;
  background: linear-gradient(to right, #2563EB, #3B82F6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1E3A8A;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.subtitle {
  font-size: 1.25rem;
  color: #4B5563;
  max-width: 600px;
  line-height: 1.6;
  margin: 0;
}

.auth-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  animation: fadeIn 1s ease-out 0.2s both;
}

.auth-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 220px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.auth-button svg {
  transition: transform 0.3s ease;
}

.auth-button:hover svg {
  transform: translateX(4px);
}

.auth-button.primary {
  background: linear-gradient(45deg, #2563EB, #3B82F6);
  color: white;
}

.auth-button.primary:hover {
  background: linear-gradient(45deg, #1D4ED8, #2563EB);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
}

.auth-button.secondary {
  background-color: white;
  color: #2563EB;
  border: 1px solid #E5E7EB;
}

.auth-button.secondary:hover {
  background-color: #F9FAFB;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-color: #D1D5DB;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 1rem;
  animation: fadeIn 1s ease-out 0.4s both;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1.25rem;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: white;
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, rgba(219, 234, 254, 0.8) 0%, rgba(239, 246, 255, 0.8) 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.feature-card:hover .feature-icon {
  background: linear-gradient(135deg, rgba(191, 219, 254, 0.9) 0%, rgba(219, 234, 254, 0.9) 100%);
  transform: scale(1.05) rotate(5deg);
}

.feature-icon svg {
  width: 1.75rem;
  height: 1.75rem;
}

.feature-card h3 {
  font-size: 1.375rem;
  font-weight: 600;
  color: #1E3A8A;
  margin: 0 0 1rem;
  letter-spacing: -0.01em;
}

.feature-card p {
  font-size: 1.0625rem;
  color: #4B5563;
  margin: 0;
  line-height: 1.6;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .welcome-content {
    gap: 3rem;
    padding: 1rem 0;
  }
  
  .logo h1 {
    font-size: 2.25rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
  }
  
  .auth-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .auth-button {
    width: 100%;
    padding: 0.875rem 2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
}
</style>