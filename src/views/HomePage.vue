<template>
  <ion-page>
    <!-- Contenido principal -->
    <ion-content>
      <!-- Logo de la compañía -->
      <div class="logo-container">
        <img src="../assets/nodality.png" alt="Logo de la compañía" class="company-logo" />
      </div>

      <!-- Información sobre la página -->
      <div>
        <p>Bienvenido a Nodality, la plataforma para gestionar tus nodos y temas de manera eficiente.</p>
        <p>Explora nuestras funcionalidades, crea y organiza contenido a tu gusto.</p>
      </div>
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
</script>

<style scoped>
/* Estilo del contenido */
.logo-container {
  margin-bottom: 30px;
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
</style>
