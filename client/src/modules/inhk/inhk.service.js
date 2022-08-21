import {InhkApiClient} from './inhk-api.client';
import {
    mapTeachers,
    mapGroups,
    mapSchedule
} from './inhk.mappers';

export class InhkService {
    constructor(client = new InhkApiClient()) {
        this.client = client;
    }

    async getTodaySchedule() {
        throw Error('Not implemented');
    }

    async getScheduleOnDate(date) {
        throw Error('Not implemented');
    }

    async getTeacherSchedule(id) {
        return this.client.getTeacherSchedule(id)
            .then(mapSchedule);
    }

    async getGroupSchedule(id) {
        return this.client.getScheduleOnDate('20.01.2022')
            .then(mapSchedule);
    }

    async getTeachers() {
        return this.client.getTeachers()
            .then(mapTeachers);
    }

    async getGroups() {
        return this.client.getGroups()
            .then(mapGroups);
    }
}
