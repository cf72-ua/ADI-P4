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
import { useThemeStore } from "../store/themeStore.js";

const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();

const title = ref("");
const description = ref("");
const imageUrl = ref("");

// Actualizar el tema
async function updateTheme() {
  const themeId = route.params.id;
  await themeStore.updateTheme(themeId, {
    title: title.value,
    description: description.value,
    imageUrl: imageUrl.value,
  });
  router.push("/listThemes"); // Redirige a la lista de temas
}

// Función para volver atrás
function goBack() {
  router.back();
}

onMounted(async () => {
  const themeId = route.params.id;
  await themeStore.fetchThemes(); // Asegúrate de que los temas están cargados
  const theme = themeStore.themes.find((t) => t.id === themeId);
  if (theme) {
    title.value = theme.title;
    description.value = theme.description;
    imageUrl.value = theme.imageUrl;
  }
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
