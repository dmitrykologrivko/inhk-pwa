const TEACHERS_SCHEDULE_STORAGE_KEY = 'inhk.teachers.schedule';
const GROUPS_SCHEDULE_STORAGE_KEY = 'inhk.groups.schedule';

export class InhkCacheService {

    async getTeacherScheduleById(id) {
        return this.#getUserScheduleFromStorage(id, TEACHERS_SCHEDULE_STORAGE_KEY);
    }

    async saveTeacherSchedule(id, schedule) {
        return this.#saveUserScheduleToStorage(id, schedule, TEACHERS_SCHEDULE_STORAGE_KEY);
    }

    async getGroupScheduleById(id) {
        return this.#getUserScheduleFromStorage(id, GROUPS_SCHEDULE_STORAGE_KEY);
    }

    async saveGroupSchedule(id, schedule) {
        return this.#saveUserScheduleToStorage(id, schedule, GROUPS_SCHEDULE_STORAGE_KEY)
    }

    async #getUserScheduleFromStorage(id, storageKey) {
        const usersSchedule = JSON.parse(
            localStorage.getItem(storageKey)
        ) || [];

        for (const current of usersSchedule) {
            if (current.id === id) {
                return current.schedule;
            }
        }

        return null;
    }

    async #saveUserScheduleToStorage(id, schedule, storageKey) {
        let usersSchedule = JSON.parse(
            localStorage.getItem(storageKey)
        ) || [];

        usersSchedule = usersSchedule.filter(current => current.id !== id);
        usersSchedule.push({ id, schedule });
        localStorage.setItem(storageKey, JSON.stringify(usersSchedule));

        return schedule;
    }
}
