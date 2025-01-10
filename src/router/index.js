import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ListThemes from '../views/ListThemes.vue'
import CreateTheme from '../views/CreateTheme.vue'
import EditTheme from '../views/EditTheme.vue'
import ListNodes from '../views/ListNodes.vue'
import CreateNode from '../views/CreateNode.vue'
import EditNode from '../views/EditNode.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/listThemes',
    name: 'ListThemes',
    component: ListThemes
  },

  {
    path: '/listThemes/create',
    name: 'CreateTheme',
    component: CreateTheme
  },
  {
    path: '/listThemes/:id/edit',
    name: 'EditTheme',
    component: EditTheme
  },
  {
    path: '/nodes',
    name: 'Nodes',
    component: ListNodes
  },
  {
    path: '/nodes/create',
    name: 'CreateNode',
    component: CreateNode
  },
  {
    path: '/nodes/:id/edit',
    name: 'EditNode',
    component: EditNode
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
