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
            <div v-if="errors.createdBy" class="error-message">{{ errors.createdBy }}</div>

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
            <div v-if="errors.themeId" class="error-message">{{ errors.themeId }}</div>

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
import { saveNode } from "@/firebase/repositories/nodeRepository";
import { getAllUsers } from "@/firebase/repositories/userRepository";
import { getAllThemes } from "@/firebase/repositories/ThemeRepository";
import { useStore } from "@/store/nodeStore";

const router = useRouter();
const nodeStore = useStore();

const title = ref("");
const content = ref("");
const createdBy = ref("");
const themeId = ref("");

const users = ref([]);
const themes = ref([]);
const errors = ref({ createdBy: "", themeId: "" });

onMounted(async () => {
  try {
    users.value = await getAllUsers();
    themes.value = await getAllThemes();
  } catch (error) {
    console.error("Failed to fetch users or themes", error);
  }
});

async function createNode() {
  errors.value = { createdBy: "", themeId: "" };

  if (!createdBy.value) {
    errors.value.createdBy = "Please select a user.";
  }

  if (!themeId.value) {
    errors.value.themeId = "Please select a theme.";
  }

  if (errors.value.createdBy || errors.value.themeId) {
    return;
  }

  const createdAt = new Date();
  const newNode = {
    title: title.value,
    content: content.value,
    createdAt: createdAt,
    createdBy: { id: createdBy.value },
    themeId: { id: themeId.value },
  };

  const result = await saveNode(newNode);
  if (result.success) {
    await fetchNodes();
    router.push("/nodes");
  } else {
    console.error("Failed to create node:", result.error);
  }
}

function goBack() {
  router.back();
}

async function fetchNodes() {
  try {
    await nodeStore.fetchNodes();
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

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
