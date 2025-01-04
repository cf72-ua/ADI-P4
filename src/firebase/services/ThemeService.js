import {
    collection,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
    deleteDoc,
    where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Configuración de Firebase adaptada

// Crear un tema con ID automático
export async function createThemeWithAutoId(title, description, imageUrl, createdBy) {
    const newTheme = {
        title,
        description,
        imageUrl,
        createdBy,
        createdAt: new Date(),
    };

    const themeDocRef = await addDoc(collection(db, "Themes"), newTheme);

    // Crear subcolección 'GroupChat' y un mensaje inicial
    const groupChatCollectionRef = collection(themeDocRef, "GroupChat");
    const groupChatDocRef = await addDoc(groupChatCollectionRef, {});
    const messagesCollectionRef = collection(groupChatDocRef, "Messages");
    const firstMessage = {
        message: "Welcome to the group chat!",
        sender: "system",
        timestamp: new Date(),
    };
    await addDoc(messagesCollectionRef, firstMessage);

    return themeDocRef.id;
}

// Obtener todos los temas
export async function getThemes() {
    const querySnapshot = await getDocs(collection(db, "Themes"));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

// Actualizar un tema
export async function updateTheme(themeId, updatedData) {
    const themeDoc = doc(db, "Themes", themeId);
    await updateDoc(themeDoc, updatedData);
}

// Eliminar un tema y sus subcolecciones
export async function deleteTheme(themeId) {
    const themeDocRef = doc(db, "Themes", themeId);
    const groupChatCollectionRef = collection(themeDocRef, "GroupChat");
    const groupChatDocs = await getDocs(groupChatCollectionRef);

    for (const groupChatDoc of groupChatDocs.docs) {
        const messagesCollectionRef = collection(groupChatDoc.ref, "Messages");
        const messagesDocs = await getDocs(messagesCollectionRef);

        for (const message of messagesDocs.docs) {
            await deleteDoc(message.ref);
        }
        await deleteDoc(groupChatDoc.ref);
    }

    await deleteDoc(themeDocRef);
}

// Obtener temas paginados
export async function getThemesPaginated(pageSize, lastVisible = null) {
    let themesQuery = query(
        collection(db, "Themes"),
        orderBy("createdAt", "asc"),
        limit(pageSize)
    );

    if (lastVisible) {
        themesQuery = query(
            collection(db, "Themes"),
            orderBy("createdAt", "asc"),
            startAfter(lastVisible),
            limit(pageSize)
        );
    }

    const querySnapshot = await getDocs(themesQuery);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return {
        themes: querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })),
        lastDoc,
    };
}

// Buscar temas por texto
export async function getThemesBySearch(queryText) {
    const q = query(
        collection(db, "Themes"),
        where("title", ">=", queryText),
        where("title", "<=", queryText + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}
