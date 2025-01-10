<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Welcome</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <form @submit.prevent="handleLogin">
            <ion-item>
              <ion-input
                v-model="email"
                type="email"
                placeholder="Email"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                type="password"
                v-model="password"
                placeholder="Password"
                required
              ></ion-input>
            </ion-item>
            <div class="ion-text-center ion-margin-top">
              <ion-button expand="block" type="submit">Log in</ion-button>
              <ion-button
                fill="clear"
                color="medium"
                @click="handlePasswordReset"
              >
                Forgot password?
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
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value); 
    console.log("Logged user:", authStore.user);

    // Redirección al home después del inicio de sesión
    router.push("/home");
  } catch (error) {
    console.error("Failed to log in:", error);
    showError("Failed to log in. Check the credentials.");
  }
}

async function handlePasswordReset() {
  try {
    if (!email.value) {
      showError("Please, write your email.");
      return;
    }
    await authStore.resetPassword(email.value);
    showSuccess("Reset password sent to email.");
  } catch (error) {
    console.error("Failed to reset password:", error);
    showError("Mail wasn't able to send.");
  }
}

async function showError(message) {
  const alert = await alertController.create({
    header: "Error",
    message,
    buttons: ["OK"],
  });
  await alert.present();
}

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
