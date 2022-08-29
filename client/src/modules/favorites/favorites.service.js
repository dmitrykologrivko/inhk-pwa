const FAVORITE_TEACHERS_STORAGE_KEY = 'favorites.teachers';
const FAVORITE_GROUPS_STORAGE_KEY = 'favorites.groups';

export class FavoritesService {

    async getFavoriteTeachers() {
        return this.#getFavorites(FAVORITE_TEACHERS_STORAGE_KEY);
    }

    async saveFavoriteTeacher(id, name) {
        await this.#saveFavorites(id, name, FAVORITE_TEACHERS_STORAGE_KEY);
    }

    async getFavoriteGroups() {
        return this.#getFavorites(FAVORITE_GROUPS_STORAGE_KEY);
    }

    async saveFavoriteGroup(id, name) {
        await this.#saveFavorites(id, name, FAVORITE_GROUPS_STORAGE_KEY);
    }

    async #getFavorites(storageKey) {
        return JSON.stringify(localStorage.getItem(storageKey) || []);
    }

    async #saveFavorites(id, name, storageKey) {
        const favorites = await this.#getFavorites(storageKey);
        favorites.push({ id, name });
        localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
}
