<template>
  <ion-page>
    <!-- Contenido principal -->
    <ion-content>
      <!-- Logo de la compañía -->
      <div class="logo-container">
        <img src="../assets/nodality.png" alt="Logo de la compañía" class="company-logo" />
      </div>
      <!-- Sección Hero -->
      <section class="hero">
        <h1 class="hero-title animate__animated animate__fadeIn">Welcome to our platform</h1>
        <p class="hero-description animate__animated animate__fadeIn animate__delay-1s">
          Manage your themes, nodes, and more, all in one place.
        </p>
        <ion-button class="cta-button btn animate__animated animate__pulse animate__infinite" @click="goToThemes">
          Explore
        </ion-button>
      </section>

      <!-- Sección Features -->
      <section class="features">
        <h2 class="animate__animated animate__fadeIn animate__delay-1s">Main Features</h2>
        <div class="features-grid">
          <!-- Enlace a Theme Management -->
          <a href="/listThemes" class="feature-card animate__animated animate__fadeIn animate__delay-2s">
            <h5>Theme Management</h5>
            <p>Easily add and manage themes.</p>
          </a>
          <!-- Enlace a Node Visualization -->
          <a href="/nodes" class="feature-card animate__animated animate__fadeIn animate__delay-3s">
            <h5>Node Visualization</h5>
            <p>Organize and manage your nodes with ease.</p>
          </a>
        </div>
      </section>
    </ion-content>
  </ion-page>
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
  IonPage,
} from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToThemes = () => {
  router.push('/listThemes'); // Navegar a la página de temas
};
</script>

<style scoped>
/* Estilo del contenido */
.logo-container {
  margin-top: 40px;
}

.company-logo {
  width: 200px;
  height: auto;
  object-fit: contain;
}

.content {
  text-align: center;
  padding: 20px;
}

/* Estilos personalizados */
.hero {
  text-align: center;
  margin-top: 30px;
}

.hero-title {
  font-size: 2rem;
}

.hero-description {
  font-size: 1.2rem;
  margin-top: 10px;
}

.cta-button {
  --background: #d1f7c4;
  --color: #2e7d32;
  margin-top: 20px;
}

.features {
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
}

.features-grid {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.feature-card {
  background-color: #d1f7c4;
  color: #2e7d32;
  padding: 20px;
  width: 250px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer; /* Hacer que los cards se vean como enlaces */
}

a {
  text-decoration: none;
}

</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
</style>
