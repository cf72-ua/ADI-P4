<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Node</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Edit Node</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="updateNode">
            <ion-item>
              <ion-input
                v-model="title"
                :placeholder="node?.title || 'Node Title'"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                v-model="content"
                :placeholder="node?.content || 'Content'"
                required
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label>Created By</ion-label>
              <ion-select v-model="createdBy" :placeholder="node?.createdBy?.email || 'Select User'" required>
                <ion-select-option
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.email }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Theme</ion-label>
              <ion-select v-model="themeId" :placeholder="node?.themeId?.title || 'Select Theme'" required>
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
              <ion-button expand="block" type="submit" class="green-button-fill">Save Changes</ion-button>
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
import { useRouter, useRoute } from "vue-router";
import { saveNode } from "@/firebase/repositories/nodeRepository";
import { getAllUsers } from "@/firebase/repositories/userRepository";
import { getAllThemes } from "@/firebase/repositories/ThemeRepository";
import { useStore } from "@/store/nodeStore";

const router = useRouter();
const route = useRoute();
const nodeStore = useStore();

const title = ref("");
const content = ref("");
const createdBy = ref("");
const themeId = ref("");

const users = ref([]);
const themes = ref([]);
let node = ref(null);

onMounted(async () => {
  try {
    users.value = await getAllUsers();
    themes.value = await getAllThemes();
    const nodeId = route.params.id;
    node.value = await nodeStore.getNodeById(nodeId);
    title.value = node.value.title;
    content.value = node.value.content;
    createdBy.value = node.value.createdBy.id;
    themeId.value = node.value.themeId.id;
  } catch (error) {
    console.error("Failed to fetch users, themes or node", error);
  }
});

async function updateNode() {
  const updatedNode = {
    id: route.params.id,
    title: title.value,
    content: content.value,
    createdBy: { id: createdBy.value },
    themeId: { id: themeId.value },
  };

  const result = await saveNode(updatedNode);
  if (result.success) {
    await fetchNodes();
    router.push("/nodes");
  } else {
    console.error("Failed to update node:", result.error);
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
</style>
