<template>
  <ion-page>
    <!-- Menú lateral -->
    <ion-menu content-id="main-content" v-show="isLoggedIn">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list class="minimal-menu-list">
          <!-- Botón Home -->
          <ion-item 
            @click="navigateTo('/home')" 
            class="menu-item"
          >
            <ion-icon slot="start" name="home-outline"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-item>

          <ion-item @click="navigateTo('/nodes')" class="menu-item">
            <ion-icon slot="start" name="layers-outline"></ion-icon>
            <ion-label>Nodes</ion-label>
          </ion-item>
          <ion-item @click="navigateTo('/listThemes')" class="menu-item">
            <ion-icon slot="start" name="brush-outline"></ion-icon>
            <ion-label>Themes</ion-label>
          </ion-item>
          <ion-item @click="navigateTo('/aboutUs')" class="menu-item">
            <ion-icon slot="start" name="information-circle-outline"></ion-icon>
            <ion-label>About Us</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Contenido principal -->
    <div class="ion-page" id="main-content">
      <ion-header :translucent="true">
        <ion-toolbar>
          <!-- Botón de menú visible solo si el usuario está logueado -->
          <ion-buttons slot="start" >
            <ion-menu-button auto-hide="false"></ion-menu-button>
          </ion-buttons>
          <ion-title>Nodes</ion-title>
          <!-- Botones de Login/Logout -->
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
    </div>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { computed } from "vue";
import { useAuthStore } from "@/store/authStore"; // Importa la store de autenticación
import { useRouter, useRoute } from "vue-router"; // Manejo de rutas en Vue Router

import { addIcons } from 'ionicons';
import { homeOutline, brushOutline, layersOutline, informationCircleOutline } from 'ionicons/icons';

addIcons({
  homeOutline,
  brushOutline,
  layersOutline,
  informationCircleOutline
});

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Computed property para verificar si hay un usuario logeado
const isLoggedIn = computed(() => !!authStore.user);

// Maneja el logout
async function handleLogout() {
  try {
    await authStore.logout();
    console.log("Sesión cerrada exitosamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
}

// Redirige al usuario a la página de login
function navigateToLogin() {
  router.push("/login");
}

// Redirige a diferentes rutas al seleccionar una opción del menú
function navigateTo(route) {
  router.push(route);
}

// Función para verificar si la ruta está activa
function isActiveRoute(path) {
  return route.path === path;
}
</script>

<style scoped>
/* Estilo del contenido */
.content {
  text-align: center;
  padding: 20px;
}

/* Estilo para el contenedor del logo */
.logo-container {
  margin-bottom: 30px;
}

.company-logo {
  width: 200px;
  height: auto;
  object-fit: contain;
}

/* Estilo para el contenedor de la información */
.info-container {
  font-size: 16px;
  line-height: 24px;
  color: #7f8c8d;
  text-align: center;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
}

/* Estilo del encabezado del menú */
.menu-header {
  --background: linear-gradient(135deg, #8e44ad, #3498db);
  color: #fff;
  text-align: center;
}

/* Lista de menú minimalista */
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

.menu-item:hover {
  --background: #e0e0e0;
}

.menu-item:active {
  --background: #d1d1d1;
  ion-icon {
    color: #2c3e50;
  }
}

</style>