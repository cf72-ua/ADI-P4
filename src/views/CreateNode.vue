<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Create Node</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>New Node</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="createNode">
            <ion-item>
              <ion-input
                  v-model="title"
                  placeholder="Node Title"
                  required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                  v-model="content"
                  placeholder="Content"
                  required
              ></ion-input>
            </ion-item>

            <!-- Lista de usuarios disponibles para 'Created By' -->
            <ion-item>
              <ion-label>Created By</ion-label>
              <ion-select v-model="createdBy" placeholder="Select User" required>
                <ion-select-option
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.email }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Lista de temas disponibles para 'Theme' -->
            <ion-item>
              <ion-label>Theme</ion-label>
              <ion-select v-model="themeId" placeholder="Select Theme" required>
                <ion-select-option
                  v-for="theme in themes"
                  :key="theme.id"
                  :value="theme.id"
                >
                  {{ theme.title }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <div class="ion-margin-top ion-text-center">
              <ion-button expand="block" type="submit" class="green-button-fill">Create</ion-button>
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
  IonSelect,
  IonSelectOption,
  IonLabel
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { saveNode } from "@/firebase/repositories/nodeRepository"; // Importa directamente la función
import { getAllUsers } from "@/firebase/repositories/userRepository"; // Debes crear esta función para obtener usuarios
import { getAllThemes } from "@/firebase/repositories/ThemeRepository"; // Debes crear esta función para obtener temas
import { useStore } from "@/store/nodeStore";

const router = useRouter();
const nodeStore = useStore();

const title = ref("");
const content = ref("");
const createdBy = ref("");
const themeId = ref("");

const users = ref([]); // Lista de usuarios disponibles
const themes = ref([]); // Lista de temas disponibles

// Cargar la lista de usuarios y temas cuando el componente se monta
onMounted(async () => {
  try {
    users.value = await getAllUsers(); // Obtén los usuarios de tu repositorio
    themes.value = await getAllThemes(); // Obtén los temas de tu repositorio
  } catch (error) {
    console.error("Failed to fetch users or themes", error);
  }
});

// Crear un nuevo nodo
async function createNode() {
  const createdAt = new Date(); // Usar la fecha actual
  const newNode = {
    title: title.value,
    content: content.value,
    createdAt: createdAt,
    createdBy: { id: createdBy.value }, // Usar el id del usuario seleccionado
    themeId: { id: themeId.value }, // Usar el id del tema seleccionado
  };

  const result = await saveNode(newNode); // Llama a la función saveNode directamente desde el repository
  if (result.success) {
    await fetchNodes();
    router.push("/nodes"); // Redirige a la lista de nodos
  } else {
    console.error("Failed to create node:", result.error);
  }
}

// Función para volver atrás
function goBack() {
  router.back();
}

async function fetchNodes() {
  // Lógica para obtener los nodos actualizados
  try {
    await nodeStore.fetchNodes(); // Asumiendo que fetchNodes está en tu tienda de nodos
  } catch (error) {
    console.error("Error fetching nodes:", error);
  }
}
</script>

<style scoped>
.ion-text-center {
  text-align: center;
}
.ion-margin-top {
  margin-top: 16px;
}

.green-button-fill {
   --background: #d1f7c4;
  color: #2e7d32;
}

</style>
