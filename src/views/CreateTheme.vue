<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Create Theme</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>New Theme</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="createTheme">
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
              <ion-button expand="block" type="submit">Create</ion-button>
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
import { ref, onMounted} from "vue";
import { useRouter } from "vue-router";
import * as ThemeRepository from "../firebase/repositories/ThemeRepository.js";

const router = useRouter();

const title = ref("");
const description = ref("");
const imageUrl = ref("");

// Reinicia los campos cuando el componente se monta
onMounted(() => {
  title.value = "";
  description.value = "";
  imageUrl.value = "";
});

// Función para crear un tema
async function createTheme() {
  try {
    const createdBy = "user123"; // Reemplaza con la lógica de usuario actual
    await ThemeRepository.createTheme(title.value, description.value, imageUrl.value, createdBy);
    router.push("/listThemes"); // Redirige a la lista de temas
  } catch (error) {
    console.error("Error creating theme:", error);
  }
}

// Función para volver atrás
function goBack() {
  router.back();
}
</script>

<style scoped>
.ion-text-center {
  text-align: center;
}
.ion-margin-top {
  margin-top: 16px;
}
</style>
