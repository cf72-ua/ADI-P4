import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Obtén la referencia a Firestore
const db = getFirestore();

// Define la colección de usuarios (asegúrate de que el nombre coincida con tu colección en Firestore)
const usersCollection = collection(db, 'users');

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    // Obtén los documentos de la colección 'users'
    const snapshot = await getDocs(usersCollection);

    // Mapea los documentos para obtener los datos de los usuarios
    const users = snapshot.docs.map(doc => ({
      id: doc.id,  // El ID del documento en Firestore
      email: doc.data().email,  // Asumiendo que tienes un campo 'email' en cada usuario
      // Puedes agregar más campos según sea necesario
    }));

    return users;  // Devuelve la lista de usuarios
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;  // Lanza el error para que lo maneje quien llame a esta función
  }
};
