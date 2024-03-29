import { InhkApiClient } from './inhk-api.client';
import { InhkCacheService } from './inhk-cache.service';
import {
    mapTeachers,
    mapGroups,
    mapSchedule
} from './inhk.mappers';

export class InhkService {
    constructor(
        client = new InhkApiClient(),
        cache = new InhkCacheService(),
    ) {
        this.client = client;
        this.cache= cache;
    }

    async getScheduleOnDate(date) {
        return await this.client.getScheduleOnDate(date)
            .then(mapSchedule);
    }

    async getTeacherSchedule(id, force = false) {
        try {
            return await this.client.getTeacherSchedule(id)
                .then(schedule => this.cache.saveTeacherSchedule(id, schedule))
                .then(mapSchedule);
        } catch (e) {
            const cachedSchedule = await this.cache.getTeacherScheduleById(id);
            if (force || !cachedSchedule) {
                throw e;
            }
            return mapSchedule(cachedSchedule);
        }
    }

    async getGroupSchedule(id, force = false) {
        try {
            return await this.client.getGroupSchedule(id)
                .then(schedule => this.cache.saveGroupSchedule(id, schedule))
                .then(mapSchedule);
        } catch (e) {
            const cachedSchedule = await this.cache.getGroupScheduleById(id);
            if (force || !cachedSchedule) {
                throw e;
            }
            return mapSchedule(cachedSchedule);
        }
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
