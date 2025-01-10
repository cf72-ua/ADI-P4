import { defineStore } from 'pinia';
import { db } from '../firebase/config/firebaseConfig.js';
import {
  login as loginService,
  logout as logoutService,
  sendPasswordReset as sendPasswordResetService,
} from '../firebase/services/authService';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import router from '../router';

// Store de autenticación
// Gestiona el estado global de la autenticación del usuario
export const useAuthStore = defineStore('auth', {
    // Estado de la store
    // Contiene las variables reactivas que representan el estado actual de la autenticación
    state: () => ({
        user: null, 
        isAdmin: false, 
    }),

    actions: {
        // login
        // Permite al usuario iniciar sesión en la aplicación
        // - Parámetros:
        //   - 'email' (string): Correo electrónico del usuario
        //   - 'password' (string): Contraseña del usuario
        // - Acciones en el estado:
        //   - Actualiza 'user' con la información del usuario autenticado
        //   - Actualiza 'isAdmin' según el rol del usuario obtenido desde Firestore
        async login(email, password) {
            try {
                const userData = await loginService(email, password);
                this.user = userData;
                this.isAdmin = userData.isAdmin;
            } catch (error) {
                throw new Error('Error al iniciar sesión: ' + error.message);
            }
        },

        // logout
        // Finaliza la sesión del usuario actual
        // - Acciones en el estado:
        // - Resetea 'user' a 'null'
        // - Resetea 'isAdmin' a 'false'
        logout() {
        logoutService();
        this.user = null;
        this.isAdmin = false;
        },

        // resetPassword
        // Envía correo de restablecimiento de contraseña
        async resetPassword(email) {
        try {
            await sendPasswordResetService(email);
            console.log('Correo de restablecimiento enviado a:', email);
        } catch (error) {
            throw new Error('Error al enviar el correo de restablecimiento: ' + error.message);
        }
        },

        // checkAuthState
        // Verifica el estado de autenticación del usuario al cargar la aplicación o recargar la página
        // Utiliza el observador `onAuthStateChanged` de Firebase para gestionar la sesión
        // - Acciones en el estado:
        //   - Actualiza 'user' con los datos del usuario autenticado si existe
        //   - Actualiza 'isAdmin' con el rol del usuario obtenido desde Firestore
        //   - Redirige al usuario a la página de login si no está autenticado
        checkAuthState() {
            const auth = getAuth();
    
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
                    router.push('/login'); 
                }
            });
        },
    },
});
