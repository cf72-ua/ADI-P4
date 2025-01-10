<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>List Themes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <div class="header-container">
            <ion-card-title>Available Themes</ion-card-title>
            <ion-button @click="createTheme" fill="solid" color="primary">Create New Theme</ion-button>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input
                v-model="searchQuery"
                placeholder="Search themes..."
                @keyup.enter="searchThemes"
            ></ion-input>
          </ion-item>
          <ion-list>
            <ion-item
                v-for="theme in filteredThemes"
                :key="theme.id"
            >
              <ion-label>
                <h2>{{ theme.title || "No title" }}</h2>
                <p>{{ theme.description || "No description" }}</p>
              </ion-label>
              <ion-buttons slot="end">
                <ion-button @click="showDetails(theme)">Details</ion-button>
                <ion-button @click="updateTheme(theme)">Edit</ion-button>
                <ion-button color="danger" @click="deleteTheme(theme.id)">Delete</ion-button>
              </ion-buttons>
            </ion-item>
          </ion-list>
          <ion-text
              v-if="!themeStore.isLoading && filteredThemes.length === 0"
              class="ion-text-center"
          >
            No topics available.
          </ion-text>
          <ion-spinner v-if="themeStore.isLoading" class="ion-margin-top"></ion-spinner>
        </ion-card-content>
      </ion-card>

      <!-- Popup de Detalles -->
      <div v-if="themeStore.currentTheme" class="popup-overlay" @click.self="closeDetails">
        <div class="popup-container">
          <h3>{{ themeStore.currentTheme.title || "No title" }}</h3>
          <p><strong>Description:</strong> {{ themeStore.currentTheme.description || "No description" }}</p>
          <p><strong>Created By:</strong> {{ themeStore.currentTheme.createdBy || "Unknown" }}</p>
          <p>
            <strong>Image URL:</strong>
            <a :href="themeStore.currentTheme.imageUrl" target="_blank">
              {{ themeStore.currentTheme.imageUrl || "No image" }}
            </a>
          </p>
          <ion-button @click="closeDetails">Close</ion-button>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonSpinner,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore }  from "../store/themeStore.js";

const router = useRouter();
const themeStore = useThemeStore();


// Filtro para los temas
const searchQuery = ref(""); // Entrada del usuario para buscar
const filteredThemes = computed(() =>
    themeStore.themes.filter((theme) =>
        theme.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

// Mostrar los detalles de un tema
function showDetails(theme) {
  themeStore.selectTheme(theme.id);
}

// Cerrar los detalles
function closeDetails() {
  themeStore.clearCurrentTheme(); // Limpia el tema seleccionado
}

// Crear un tema
async function createTheme() {
  router.push("/listThemes/create"); // Redirige a la página de creación de un nuevo tema
}

// Actualizar un tema
async function updateTheme(theme) {
  router.push(`/listThemes/${theme.id}/edit`); // Redirige a la página de edición
}

// Eliminar un tema
async function deleteTheme(themeId) {
  await themeStore.deleteTheme(themeId);
}

// Buscar temas (en este caso, simplemente filtra localmente)
function searchThemes() {
  // La búsqueda se realiza automáticamente mediante `filteredThemes` (computed)
}

// Vuelve a cargar los temas al entrar en esta página
onMounted(() => {
  themeStore.fetchThemes();
});
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.popup-container {
  background-color: #444;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.ion-text-center {
  text-align: center;
  margin-top: 16px;
}
</style>
