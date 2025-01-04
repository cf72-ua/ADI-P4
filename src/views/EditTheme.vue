<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Theme</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Update Theme</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="updateTheme">
            <ion-item>
              <ion-input
                  v-model="title"
                  placeholder="Theme Title"
                  required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                  v-model="description"
                  placeholder="Description"
                  required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                  v-model="imageUrl"
                  placeholder="Image URL"
              ></ion-input>
            </ion-item>
            <div class="ion-margin-top ion-text-center">
              <ion-button expand="block" type="submit">Update</ion-button>
              <ion-button fill="clear" color="medium" @click="goBack">Cancel</ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>
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
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as ThemeRepository from "../firebase/repositories/ThemeRepository.js";

const router = useRouter();
const route = useRoute();

const title = ref("");
const description = ref("");
const imageUrl = ref("");

// Función para cargar los datos del tema
async function fetchTheme() {
  try {
    const themeId = route.params.id; // Obtiene el ID del tema desde la URL
    const themes = await ThemeRepository.getAllThemes();
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      title.value = theme.title;
      description.value = theme.description;
      imageUrl.value = theme.imageUrl;
    }
  } catch (error) {
    console.error("Error fetching theme:", error);
  }
}

// Función para actualizar el tema
async function updateTheme() {
  try {
    const themeId = route.params.id;
    await ThemeRepository.updateTheme(themeId, {
      title: title.value,
      description: description.value,
      imageUrl: imageUrl.value,
    });
    router.push("/listThemes"); // Redirige a la lista de temas
  } catch (error) {
    console.error("Error updating theme:", error);
  }
}

// Función para volver atrás
function goBack() {
  router.back();
}

onMounted(() => {
  fetchTheme();
});
</script>

<style scoped>
.ion-text-center {
  text-align: center;
}
.ion-margin-top {
  margin-top: 16px;
}
</style>
