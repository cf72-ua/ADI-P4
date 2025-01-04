import * as themeService from "../services/ThemeService.js";

// Crear un tema
export async function createTheme(title, description, imageUrl, createdBy) {
    try {
        const themeId = await themeService.createThemeWithAutoId(
            title,
            description,
            imageUrl,
            createdBy
        );
        return { message: "Theme created", themeId };
    } catch (error) {
        throw new Error(`Error in createTheme: ${error.message}`);
    }
}

// Obtener todos los temas
export async function getAllThemes() {
    try {
        return await themeService.getThemes();
    } catch (error) {
        throw new Error(`Error in getAllThemes: ${error.message}`);
    }
}

// Actualizar un tema
export async function updateTheme(themeId, updatedData) {
    try {
        await themeService.updateTheme(themeId, updatedData);
        return { message: "Theme updated" };
    } catch (error) {
        throw new Error(`Error in updateTheme: ${error.message}`);
    }
}

// Eliminar un tema
export async function deleteTheme(themeId) {
    try {
        await themeService.deleteTheme(themeId);
        return { message: "Theme deleted" };
    } catch (error) {
        throw new Error(`Error in deleteTheme: ${error.message}`);
    }
}

// Obtener temas paginados
export async function getPaginatedThemes(pageSize, lastVisible = null) {
    try {
        const result = await themeService.getThemesPaginated(pageSize, lastVisible);
        return {
            themes: result.themes || [],
            lastDoc: result.lastDoc || null,
        };
    } catch (error) {
        throw new Error(`Error in getPaginatedThemes: ${error.message}`);
    }
}

// Buscar temas
export async function searchThemes(queryText) {
    try {
        const result = await themeService.getThemesBySearch(queryText);
        return {
            themes: result || [],
        };
    } catch (error) {
        throw new Error(`Error in searchThemes: ${error.message}`);
    }
}
