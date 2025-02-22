// Importar Firebase en formato compat para usar ESM
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Configuración de Firebase
// Este objeto contiene las credenciales necesarias para conectar la aplicación con el proyecto de firebase
const firebaseConfig = {
    apiKey: "AIzaSyBaSGmRQjAR0B3el_tKgK-mIU0Mns9BjMY",  // Clave de la API
    authDomain: "nodality-47c38.firebaseapp.com", // Dominio de autenticación
    projectId: "nodality-47c38", // ID del proyecto en Firebase
    storageBucket: "nodality-47c38.appspot.com", // Bucket de almacenamiento para subir archivos
    messagingSenderId: "258860610070", // ID del remitente de mensajes
    appId: "1:258860610070:web:d6376ee68f401b7becbb37", // ID único de la aplicación
};

// Inicializar Firebase
// Este paso conecta la configuración con Firebase, permitiendo que la aplicación utilice los servicios
const app = firebase.initializeApp(firebaseConfig);

// Inicializar Firestore y Auth
// Exportamos las instancias de Firestore y Auth para usarlas en otros módulos
export const db = firebase.firestore(); // Base de datos en tiempo real de Firebase
export const auth = firebase.auth(); // Servicio de autenticación de Firebase

// Obtener el token de registro. Inicialmente realiza una llamada a la red, y en llamadas posteriores
// getToken devolverá el token desde la caché.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});
getToken(messaging, { vapidKey: 'BM-S_NoHbqm6kvhKs6yVOhczjYYhfFfkartZg83Te8YNB4EoVZdstDkKJn8nYal3BugltRE5PY2reVY-Dlh71uA' }).then((currentToken) => {
    if (currentToken) {
        // Enviar el token al servidor y actualizar la UI si es necesario
        console.log("Token is: ", currentToken);
    } else {
        // Mostrar la interfaz de solicitud de permiso
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});