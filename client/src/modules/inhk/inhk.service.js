import {InhkApiClient} from './inhk-api.client';
import {
    mapTeachers,
    mapGroups
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
        throw Error('Not implemented');
    }

    async getGroupSchedule(id) {
        throw Error('Not implemented');
    }

    async getTeachers() {
        return this.client.getTeachers()
            .then(dto => mapTeachers(dto));
    }

    async getGroups() {
        return this.client.getGroups()
            .then(dto => mapGroups(dto));
    }
}
