import { defineStore } from 'pinia';
import * as ThemeRepository from '../firebase/repositories/ThemeRepository.js';

/**
 * Almacén de temas utilizando Pinia
 * - Gestiona el estado relacionado con los temas
 * - Ofrece acciones para interactuar con Firestore a través del repositorio de temas
 */
export const useThemeStore = defineStore('theme', {
    state: () => ({
        themes: [], // Lista de temas cargados desde Firestore
        currentTheme: null, // Tema seleccionado o en edición
        isLoading: false, // Indicador de carga
        error: null, // Para manejar errores
    }),

    actions: {
        /**
         * Carga todos los temas desde Firestore y los almacena en el estado
         * @returns {Promise<void>} Actualiza el estado con la lista de temas o maneja errores
         */
        async fetchThemes() {
            this.isLoading = true;
            this.error = null;
            try {
                const themes = await ThemeRepository.getAllThemes();
                this.themes = themes;
            } catch (error) {
                console.error('Error fetching themes:', error);
                this.error = 'Error al cargar los temas.';
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Crea un nuevo tema y lo añade a la lista local
         * @param {string} title - Título del tema
         * @param {string} description - Descripción del tema
         * @param {string} imageUrl - URL de la imagen del tema
         * @param {string} createdBy - ID del usuario que crea el tema
         * @returns {Promise<void>} Maneja la creación y actualiza el estado
         */
        async createTheme(title, description, imageUrl, createdBy) {
            this.isLoading = true;
            this.error = null;
            try {
                const themeId = await ThemeRepository.createTheme(
                    title,
                    description,
                    imageUrl,
                    createdBy
                );
                // Añadir el tema a la lista local tras crearlo
                this.themes.push({ id: themeId, title, description, imageUrl, createdBy });
            } catch (error) {
                console.error('Error creating theme:', error);
                this.error = 'Error al crear el tema.';
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Elimina un tema por su ID tanto en Firestore como en el estado local
         * @param {string} themeId - ID del tema a eliminar
         * @returns {Promise<void>} Maneja la eliminación y actualiza el estado
         */
        async deleteTheme(themeId) {
            this.isLoading = true;
            this.error = null;
            try {
                await ThemeRepository.deleteTheme(themeId);
                // Eliminar el tema localmente tras borrarlo en Firestore
                this.themes = this.themes.filter((theme) => theme.id !== themeId);
            } catch (error) {
                console.error('Error deleting theme:', error);
                this.error = 'Error al eliminar el tema.';
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Actualiza un tema existente por su ID
         * @param {string} themeId - ID del tema a actualizar
         * @param {Object} updatedData - Objeto con los datos actualizados
         * @returns {Promise<void>} Maneja la actualización y modifica el estado local
         */
        async updateTheme(themeId, updatedData) {
            this.isLoading = true;
            this.error = null;
            try {
                await ThemeRepository.updateTheme(themeId, updatedData);
                // Actualizar el tema localmente tras modificarlo en Firestore
                const index = this.themes.findIndex((theme) => theme.id === themeId);
                if (index !== -1) {
                    this.themes[index] = { ...this.themes[index], ...updatedData };
                }
            } catch (error) {
                console.error('Error updating theme:', error);
                this.error = 'Error al actualizar el tema.';
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Selecciona un tema del estado por su ID para mostrar detalles o editarlo
         * @param {string} themeId - ID del tema a seleccionar
         */
        selectTheme(themeId) {
            this.currentTheme = this.themes.find((theme) => theme.id === themeId) || null;
        },

        /**
         * Busca temas localmente por coincidencia en el título
         * @param {string} query - Texto de búsqueda
         * @returns {Array} Lista de temas que coinciden con el texto
         */
        searchThemes(query) {
            if (!query) return this.themes;
            return this.themes.filter((theme) =>
                theme.title.toLowerCase().includes(query.toLowerCase())
            );
        },

        /**
         * Limpia el tema actualmente seleccionado
         */
        clearCurrentTheme() {
            this.currentTheme = null;
        },
    },

    getters: {
        /**
         * Devuelve los temas ordenados por fecha de creación en orden descendente
         * @param {Object} state - Estado del almacén
         * @returns {Array} Lista de temas ordenados por fecha
         */
        sortedThemes: (state) => {
            return [...state.themes].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        },
    },
});
