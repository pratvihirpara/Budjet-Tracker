<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <h1 class="app-title">Budget<span>Tracker</span></h1>
      </div>
      
      <nav class="nav-menu">
        <div class="nav-links">
          <router-link to="/dashboard" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </router-link>
          
          <div class="dropdown">
            <button class="dropdown-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              Transactions
            </button>
            <div class="dropdown-content">
              <router-link to="/transaction" class="dropdown-link">All Transactions</router-link>
              <router-link to="/history" class="dropdown-link">History</router-link>
            </div>
          </div>
          
          <router-link to="/categories" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Categories
          </router-link>
          
          <router-link to="/noteballs" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            Noteballs
          </router-link>
          
          <router-link to="/reports" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            Reports
          </router-link>
          
          <router-link to="/savings" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"></path>
            </svg>
            Savings
          </router-link>
        </div>
        
        <div class="nav-actions">
          <router-link to="/settings" class="action-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </router-link>
          
          <router-link to="/help" class="action-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </router-link>
          
          <button @click="logout" class="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()
const logout = async () => {
  const auth = getAuth()
  await signOut(auth)
  router.push('/') // Redirect to Welcome page
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  padding: 0;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
}

.logo-container svg {
  color: #93c5fd;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.5px;
}

.app-title span {
  font-weight: 400;
  color: #bfdbfe;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #e0e7ff;
  font-weight: 500;
  font-size: 0.9375rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-link.router-link-exact-active {
  background: #3b82f6;
  color: #fff;
  font-weight: 600;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.action-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #e0e7ff;
  transition: all 0.2s ease;
}

.action-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.action-link svg {
  width: 20px;
  height: 20px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #fecaca;
  font-weight: 500;
  font-size: 0.9375rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #ef4444;
  color: #fff;
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}

/* Dropdown styles */
.dropdown {
  position: relative;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #e0e7ff;
  font-weight: 500;
  font-size: 0.9375rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.dropdown-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 200px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem 0;
  z-index: 10;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #1e40af;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.dropdown-link:hover {
  background: #e0e7ff;
  color: #1e3a8a;
}

.dropdown-link.router-link-exact-active {
  background: #3b82f6;
  color: white;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .header-container {
    padding: 0 1.5rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link, .dropdown-btn {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    padding: 1rem;
  }
  
  .logo-container {
    padding: 0.5rem 0;
  }
  
  .nav-menu {
    width: 100%;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  
  .nav-links {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
  }
  
  .nav-links::-webkit-scrollbar {
    display: none;
  }
  
  .nav-actions {
    border-left: none;
    margin-left: 0;
    padding-left: 0;
  }
  
  .logout-btn span {
    display: none;
  }
}
</style>