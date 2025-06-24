import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth"
import WelcomePage from '../components/WelcomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from '../components/SignupPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import HistoryPage from '../pages/HistoryPage.vue'
import ReportsPage from '../pages/ReportsPage.vue'
import CategoriesPage from '../pages/CategoriesPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'
import HelpPage from '../pages/HelpPage.vue'
import NoteballsPage from '../views/NoteballsPage.vue'
import TransactionPage from '../pages/TransactionPage.vue'

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { 
    path: '/dashboard', 
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryPage
  },
  {
    path: '/reports',
    name: 'Reports',
    component: ReportsPage
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesPage
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  },
  {
    path: '/help',
    name: 'Help',
    component: HelpPage
  },
  {
    path: '/savings',
    name: 'Savings',
    component: () => import('../pages/SavingsPage.vue')
  },
  { path: '/noteballs', component: NoteballsPage, meta: { requiresAuth: true } },
  { path: '/transaction', component: TransactionPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    onAuthStateChanged(auth, user => {
      if (user) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router