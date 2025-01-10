<template>
  <ion-app>
    <!-- Menú lateral -->
    <ion-menu content-id="main-content" v-show="isLoggedIn">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list class="minimal-menu-list">
          <ion-item
            :class="{ 'active-item': isActive('/home') }"
            @click="navigateTo('/home')"
            class="menu-item"
          >
            <ion-icon slot="start" name="home-outline"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-item>
          <ion-item
            :class="{ 'active-item': isActive('/nodes') }"
            @click="navigateTo('/nodes')"
            class="menu-item"
          >
            <ion-icon slot="start" name="layers-outline"></ion-icon>
            <ion-label>Nodes</ion-label>
          </ion-item>
          <ion-item
            :class="{ 'active-item': isActive('/listThemes') }"
            @click="navigateTo('/listThemes')"
            class="menu-item"
          >
            <ion-icon slot="start" name="brush-outline"></ion-icon>
            <ion-label>Themes</ion-label>
          </ion-item>
          <ion-item
            :class="{ 'active-item': isActive('/aboutUs') }"
            @click="navigateTo('/aboutUs')"
            class="menu-item"
          >
            <ion-icon slot="start" name="information-circle-outline"></ion-icon>
            <ion-label>About Us</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Encabezado global -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false" v-if="isLoggedIn"></ion-menu-button>
        </ion-buttons>
        <ion-title>Nodality</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="isLoggedIn" @click="handleLogout" color="danger">
            Logout
          </ion-button>
          <ion-button v-else @click="navigateToLogin" color="primary">
            Login
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Contenedor principal para las vistas -->
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/vue';
import { computed } from 'vue';
import { useAuthStore } from '@/store/authStore'; // Store de autenticación
import { useRouter } from 'vue-router'; // Router para navegación

// Íconos de Ionicons
import { addIcons } from 'ionicons';
import {
  homeOutline,
  brushOutline,
  layersOutline,
  informationCircleOutline,
} from 'ionicons/icons';

addIcons({
  homeOutline,
  brushOutline,
  layersOutline,
  informationCircleOutline,
});

const authStore = useAuthStore();
const router = useRouter();

// Estado de autenticación del usuario
const isLoggedIn = computed(() => !!authStore.user);

// Maneja el logout
async function handleLogout() {
  try {
    await authStore.logout();
    console.log('Sesión cerrada exitosamente');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
}

// Navegar a login
function navigateToLogin() {
  router.push('/login');
}

// Navegar a otras rutas
function navigateTo(route) {
  router.push(route);
}

// Verifica si la ruta actual coincide con el item del menú
function isActive(route) {
  return router.currentRoute.value.path === route;
}
</script>

<style scoped>
/* Estilo del menú lateral */
.minimal-menu-list {
  --background: #f4f4f4;
}

.menu-item {
  --background: transparent;
  --border-radius: 12px;
  margin: 12px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.menu-item ion-icon {
  font-size: 20px;
  color: #7f8c8d;
  margin-right: 12px;
  transition: color 0.3s ease-in-out;
}

.menu-item ion-label {
  flex: 1;
}

/* Elemento activo */
.active-item {
  --background: #d1f7c4;
  color: #2e7d32;
  font-weight: bold;
}

.active-item ion-icon {
  color: #2e7d32;
}
</style>
