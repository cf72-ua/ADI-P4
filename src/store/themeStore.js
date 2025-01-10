import { defineStore } from 'pinia';
import * as ThemeRepository from '../firebase/repositories/ThemeRepository.js';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        themes: [], // Lista de temas cargados desde Firestore
        currentTheme: null, // Tema seleccionado o en edición
        isLoading: false, // Indicador de carga
        error: null, // Para manejar errores
    }),

    actions: {
        // Cargar todos los temas
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

        // Crear un tema
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

        // Eliminar un tema
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

        // Actualizar un tema
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

        // Seleccionar un tema para mostrar detalles o editar
        selectTheme(themeId) {
            this.currentTheme = this.themes.find((theme) => theme.id === themeId) || null;
        },

        // Buscar temas localmente
        searchThemes(query) {
            if (!query) return this.themes;
            return this.themes.filter((theme) =>
                theme.title.toLowerCase().includes(query.toLowerCase())
            );
        },

        // Limpiar el tema actual
        clearCurrentTheme() {
            this.currentTheme = null;
        },
    },

    getters: {
        // Ordenar los temas por fecha de creación
        sortedThemes: (state) => {
            return [...state.themes].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        },
    },
});
