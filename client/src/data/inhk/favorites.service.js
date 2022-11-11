const FAVORITE_TEACHERS_STORAGE_KEY = 'favorites.teachers';
const FAVORITE_GROUPS_STORAGE_KEY = 'favorites.groups';

export class FavoritesService {

    async getFavoriteTeachers() {
        return this.#getFavorites(FAVORITE_TEACHERS_STORAGE_KEY);
    }

    async isTeacherFavorite(id) {
        return (await this.#findFavorite(id, FAVORITE_TEACHERS_STORAGE_KEY)) !== null;
    }

    async saveFavoriteTeacher(id, name) {
        await this.#saveFavorite(id, name, FAVORITE_TEACHERS_STORAGE_KEY);
    }

    async removeFavoriteTeacher(id) {
        return this.#removeFavorite(id, FAVORITE_TEACHERS_STORAGE_KEY);
    }

    async getFavoriteGroups() {
        return this.#getFavorites(FAVORITE_GROUPS_STORAGE_KEY);
    }

    async isGroupFavorite(id) {
        return (await this.#findFavorite(id, FAVORITE_GROUPS_STORAGE_KEY)) !== null;
    }

    async saveFavoriteGroup(id, name) {
        await this.#saveFavorite(id, name, FAVORITE_GROUPS_STORAGE_KEY);
    }

    async removeFavoriteGroup(id) {
        return this.#removeFavorite(id, FAVORITE_GROUPS_STORAGE_KEY);
    }

    async #findFavorite(id, storageKey) {
        for (const favorite of await this.#getFavorites(storageKey)) {
            if (favorite.id === id) {
                return favorite;
            }
        }
        return null;
    }

    async #getFavorites(storageKey) {
        const favorites = localStorage.getItem(storageKey);
        return favorites ? JSON.parse(favorites) : [];
    }

    async #saveFavorite(id, name, storageKey) {
        const favorites = await this.#getFavorites(storageKey);
        favorites.push({ id, name });
        localStorage.setItem(storageKey, JSON.stringify(favorites));
    }

    async #removeFavorite(id, storageKey) {
        const favorites = (await this.#getFavorites(storageKey))
            .filter(favorite => favorite.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
}
