<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Iniciar Sesión</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Bienvenido</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="handleLogin">
            <ion-item>
              <ion-input
                v-model="email"
                type="email"
                placeholder="Correo electrónico"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                type="password"
                v-model="password"
                placeholder="Contraseña"
                required
              ></ion-input>
            </ion-item>
            <div class="ion-text-center ion-margin-top">
              <ion-button expand="block" type="submit">Iniciar Sesión</ion-button>
              <ion-button
                fill="clear"
                color="medium"
                @click="handlePasswordReset"
              >
                ¿Olvidaste tu contraseña?
              </ion-button>
            </div>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  alertController,
  toastController,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore"; // Importa la store de autenticación

const router = useRouter();
const authStore = useAuthStore(); // Instancia de la store de Pinia

const email = ref("");
const password = ref("");

// Maneja el inicio de sesión usando la store
async function handleLogin() {
  try {
    await authStore.login(email.value, password.value); // Acción de la store
    console.log("Usuario autenticado:", authStore.user);

    // Redirección al home después del inicio de sesión
    router.push("/home");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    showError("Error al iniciar sesión. Verifica tus credenciales.");
  }
}

// Maneja el restablecimiento de contraseña
async function handlePasswordReset() {
  try {
    if (!email.value) {
      showError("Por favor, introduce tu correo electrónico.");
      return;
    }
    await authStore.resetPassword(email.value); // Usa la acción de la store
    showSuccess("Correo de restablecimiento enviado.");
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    showError("No se pudo enviar el correo de restablecimiento.");
  }
}

// Muestra un mensaje de error
async function showError(message) {
  const alert = await alertController.create({
    header: "Error",
    message,
    buttons: ["OK"],
  });
  await alert.present();
}

// Muestra un mensaje de éxito
async function showSuccess(message) {
  const toast = await toastController.create({
    message,
    duration: 2000,
    position: "bottom",
  });
  await toast.present();
}
</script>

<style scoped>
.ion-text-center {
  margin-top: 16px;
}
</style>
