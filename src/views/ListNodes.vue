<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nodes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <div class="header-container">
            <ion-card-title>Nodes</ion-card-title>
            <ion-button @click="createNode" fill="solid" class="green-button-fill">Create New Node</ion-button>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input
              v-model="searchQuery"
              placeholder="Search nodes..."
              @keyup.enter="searchNodes"
            ></ion-input>
          </ion-item>
          <ion-list>
            <ion-item
              v-for="node in filteredNodes"
              :key="node.id"
            >
              <ion-label>
                <h2>{{ node.title || "No title" }}</h2>
                <p>{{ node.createdAt || "Unknown creation date" }}</p>
                <p>Created By: {{ node.createdBy || "Unknown" }}</p>
                <p>Theme: {{ node.themeId || "Unknown" }}</p>
                <ion-button @click="showDetails(node)" fill="clear" class="green-button">Details</ion-button>
                <ion-button @click="updateNode(node)" fill="clear" class="green-button">Edit</ion-button>
                <ion-button color="danger" @click="deleteNode(node.id)" fill="clear">Delete</ion-button>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-text v-if="!isLoading && filteredNodes.length === 0" class="ion-text-center">
            No nodes available.
          </ion-text>
          <ion-spinner v-if="isLoading" class="ion-margin-top"></ion-spinner>
        </ion-card-content>
      </ion-card>

      <!-- Popup de Detalles -->
      <div v-if="selectedNode" class="popup-overlay" @click.self="closeDetails">
        <div class="popup-container">
          <h3>{{ selectedNode.title || "No title" }}</h3>
          <p><strong>Created At:</strong> {{ selectedNode.createdAt || "Unknown" }}</p>
          <p><strong>Created By:</strong> {{ selectedNode.createdBy || "Unknown" }}</p>
          <p><strong>Theme:</strong> {{ selectedNode.themeId || "Unknown" }}</p>
          <ion-button fill="clear" @click="closeDetails" class="green-button">Close</ion-button>
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
import { useStore } from "@/store/nodeStore";
import { useRouter } from "vue-router";

const router = useRouter();
const nodeStore = useStore();

const searchQuery = ref("");
const isLoading = ref(false);
const selectedNode = ref(null);

const filteredNodes = computed(() =>
  nodeStore.nodes.filter((node) =>
    node.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

async function fetchNodes() {
  isLoading.value = true;
  try {
    await nodeStore.fetchNodes();
  } catch (error) {
    console.error("Error fetching nodes:", error);
  } finally {
    isLoading.value = false;
  }
}

function showDetails(node) {
  selectedNode.value = node;
}

function closeDetails() {
  selectedNode.value = null;
}

async function createNode() {
  router.push("/nodes/create");
}

async function updateNode(node) {
  router.push(`/nodes/${node.id}/edit`);
}

async function deleteNode(nodeId) {
  try {
    await nodeStore.deleteNode(nodeId);
    console.log("Node deleted successfully");

    router.go(0);
  } catch (error) {
    console.error("Error deleting node:", error);
  }
}

function searchNodes() {
  // Filtrado local mediante `filteredNodes`
}

onMounted(() => {
  fetchNodes();
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
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.ion-text-center {
  text-align: center;
  margin-top: 16px;
}

.green-button {
  color: #2e7d32;
}

.green-button-fill {
   --background: #d1f7c4;
  color: #2e7d32;
}

</style>
