import { defineStore } from 'pinia';
import { ref } from 'vue';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config/firebaseConfig';
import { getAllNodes } from '@/firebase/repositories/nodeRepository';

// Store de node
// Esta store gestiona el estado y las operaciones relacionadas con los nodos en la base de datos Firestore
export const useStore = defineStore('main', () => {
  // Estado Reactivo
  // - 'nodes': Una lista reactiva que contiene todos los nodos obtenidos desde Firestore
  const nodes = ref([]);

  // fetchUserAndThemeDetails
  // Obtiene los detalles del creador del nodo 'createdBy' y del tema asociado 'themeId' desde Firestore
  // - Parámetros:
  //   - 'createdById' (string): ID del usuario creador del nodo
  //   - 'themeId' (string): ID del tema asociado al nodo
  // - Devuelve: Un objeto con 'userEmail' (correo del creador) y 'themeTitle' (título del tema)
  const fetchUserAndThemeDetails = async (createdById, themeId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', createdById)); 
      const userEmail = userDoc.exists() ? userDoc.data().email : null;

      const themeDoc = await getDoc(doc(db, 'Themes', themeId));
      const themeTitle = themeDoc.exists() ? themeDoc.data().title : null;

      return { userEmail, themeTitle };
    } catch (error) {
      console.error('Error al obtener detalles de usuario o tema:', error.message);
      return { userEmail: null, themeTitle: null }; 
    }
  };

  // formatNodeData
  // Formatea los datos de un nodo para convertir valores a formatos compatibles
  // - Parámetros:
  //   - 'node' (object): Un nodo obtenido desde Firestore
  // - Acciones: 
  //   - Convierte 'createdAt' (si existe) a una fecha legible
  //   - Sustituye los IDs de 'createdBy' y 'themeId' por valores descriptivos
  // - Devuelve: Un objeto con los datos del nodo formateados
  const formatNodeData = async (node) => {
    const { createdBy, themeId } = node;
    const { userEmail, themeTitle } = await fetchUserAndThemeDetails(createdBy.id, themeId.id);

    return {
      ...node,
      createdAt: node.createdAt ? node.createdAt.toDate().toLocaleDateString() : null, 
      createdBy: userEmail, 
      themeId: themeTitle, 
    };
  };

  // fetchNodes
  // Recupera todos los nodos almacenados en Firestore
  // - Acciones: 
  //   - Actualiza 'nodes' con los datos obtenidos desde Firestore
  const fetchNodes = async () => {
    try {
        nodes.value = await getAllNodes();
        console.log('Fetched nodes:', nodes.value); 
      } catch (error) {
        console.error("Error al obtener nodos:", error.message);
      }
  };

  // getNodeById
  // Recupera un nodo específico desde Firestore, utilizando su ID
  // - Parámetros:
  //   - 'nodeId' (string): El ID del nodo que se desea obtener
  // - Devuelve: Un objeto con los datos del nodo, formateados mediante `formatNodeData`
  const getNodeById = async (nodeId) => {
    const nodeDoc = doc(db, 'Nodes', nodeId);
    const nodeSnapshot = await getDoc(nodeDoc);
    const nodeData = nodeSnapshot.data();
    return formatNodeData({ id: nodeSnapshot.id, ...nodeData }); 
  };

  // deleteNode
  // Elimina un nodo específico de Firestore
  // - Parámetros:
  //   - 'nodeId' (string): El ID del nodo que se desea eliminar
  // - Acciones:
  //   - Elimina el nodo de Firestore
  //   - Actualiza la lista de nodos 'nodes' llamando a 'fetchNodes'
  const deleteNode = async (nodeId) => {
    const nodeDoc = doc(db, 'Nodes', nodeId);
    await deleteDoc(nodeDoc);
    await fetchNodes();  
  };

  return {
    nodes,
    fetchNodes,
    getNodeById,
    deleteNode,
  };
});
