const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BASE_API_URL = 'https://inhk.ru/api/';
const TODAY_SCHEDULE_URL = BASE_API_URL + 'today';
const DATED_SCHEDULE_URL = (date) => `${BASE_API_URL}date/${date}`;
const TEACHER_SCHEDULE_URL = (id) => `${BASE_API_URL}teacher/${id}`;
const GROUP_SCHEDULE_URL = (id) => `${BASE_API_URL}group/${id}`;
const TEACHERS_URL = BASE_API_URL + 'teachers';
const GROUPS_URL = BASE_API_URL + 'groups';

class InhkApiException extends Error {}

class InhkClient {

    async getTodaySchedule() {
        return await this.fetchData(TODAY_SCHEDULE_URL);
    }

    async getScheduleOnDate(date) {
        return await this.fetchData(DATED_SCHEDULE_URL(date));
    }

    async getTeacherSchedule(id) {
        return await this.fetchData(TEACHER_SCHEDULE_URL(id));
    }

    async getGroupSchedule(id) {
        return await this.fetchData(GROUP_SCHEDULE_URL(id));
    }

    async getTeachers() {
        return await this.fetchData(TEACHERS_URL);
    }

    async getGroups() {
        return await this.fetchData(GROUPS_URL);
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            throw new InhkApiException(e.message);
        }
    }
}

module.exports = {
    InhkApiError: InhkApiException,
    InhkClient
};
