<template>
  <div>
    <AppHeader v-if="showHeader"/>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
  
const route = useRoute()
// Show header on all pages except welcome, login, signup
const showHeader = computed(() =>
  !['/', '/login', '/signup'].includes(route.path)
)
</script>

<style scoped>
:root {
  --color-powder-blue: #BFD8EB;
  --color-sky-blue: #A9D6E5;
  --color-light-navy: #5C6B73;
  --color-pale-cyan: #CAF0F8;
  --color-mist-blue: #90E0EF;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.navbar {
  width: 240px;
  background: linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.app-name {
  font-size: 1.2rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-link i {
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-left: 3px solid white;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.user-name {
  font-size: 0.9rem;
}

.content {
  flex-grow: 1;
  padding: 30px;
  background-color: white;
  border-radius: 8px 0 0 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
}

.main-content {
  flex: 1;
  padding: 16px; /* or less */
  background-color: #f8fafc;
}

/* Dark theme variables */
.dark-theme {
  --bg: #181a1b;
  --text: #f5f7fa;
  --navbar: #23272a;
  --card: #23272a;
  background: #181a1b !important;
  color: #f5f7fa !important;
}

body,
#app {
  background: var(--bg, #f5f7fa);
  color: var(--text, #2c3e50);
}

.navbar {
  background: var(--navbar, linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%));
}

.card, .content {
  background: var(--card, white);
  color: var(--text, #2c3e50);
}

/* Responsive design */
@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }
  
  .navbar {
    width: 100%;
    flex-direction: row;
    padding: 10px;
  }
  
  .navbar-brand {
    padding: 0 10px;
    margin-bottom: 0;
    border-bottom: none;
  }
  
  .nav-links {
    flex-direction: row;
    overflow-x: auto;
    flex-grow: 1;
    margin: 0 10px;
  }
  
  .nav-link {
    padding: 10px 15px;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .nav-link.router-link-exact-active {
    border-left: none;
    border-bottom: 3px solid white;
  }
  
  .nav-link span {
    display: none;
  }
  
  .user-profile {
    display: none;
  }
  
  .content {
    border-radius: 0;
  }
}
</style>