import { defineStore } from 'pinia';
import { db } from '../firebase/config/firebaseConfig.js';
import {
  login as loginService,
  logout as logoutService,
  sendPasswordReset as sendPasswordResetService,
} from '../firebase/services/authService';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useIonRouter } from '@ionic/vue';

// Store de autenticación
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Usuario autenticado
    isAdmin: false, // Rol de administrador
  }),

  actions: {
    // login: Autenticación del usuario
    async login(email, password) {
      try {
        const userData = await loginService(email, password);
        this.user = userData;
        this.isAdmin = userData.isAdmin;
      } catch (error) {
        throw new Error('Error al iniciar sesión: ' + error.message);
      }
    },

    // logout: Cierre de sesión
    logout() {
      logoutService();
      this.user = null;
      this.isAdmin = false;
    },

    // resetPassword: Envía correo de restablecimiento de contraseña
    async resetPassword(email) {
      try {
        await sendPasswordResetService(email);
        console.log('Correo de restablecimiento enviado a:', email);
      } catch (error) {
        throw new Error('Error al enviar el correo de restablecimiento: ' + error.message);
      }
    },

    // checkAuthState: Verifica el estado de autenticación
    checkAuthState() {
      const auth = getAuth();
      const ionRouter = useIonRouter(); // Manejo del router en Ionic

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          const uid = user.uid;

          try {
            const userDocRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              this.isAdmin = userData.admin || false;
            } else {
              this.isAdmin = false;
            }
          } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            this.isAdmin = false;
          }
        } else {
          this.user = null;
          this.isAdmin = false;

          // Redirección adaptada a Ionic
          ionRouter.push('/login');
        }
      });
    },
  },
});
