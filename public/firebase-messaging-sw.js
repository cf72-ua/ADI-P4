// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
/* eslint-disable no-undef */
self.importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBaSGmRQjAR0B3el_tKgK-mIU0Mns9BjMY",  // Clave de la API
    authDomain: "nodality-47c38.firebaseapp.com", // Dominio de autenticación
    projectId: "nodality-47c38", // ID del proyecto en Firebase
    storageBucket: "nodality-47c38.appspot.com", // Bucket de almacenamiento para subir archivos
    messagingSenderId: "258860610070", // ID del remitente de mensajes
    appId: "1:258860610070:web:d6376ee68f401b7becbb37", // ID único de la aplicación
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});