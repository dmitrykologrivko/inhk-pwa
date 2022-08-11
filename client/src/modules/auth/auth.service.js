import {User} from './user.model';

const USER_STORAGE_KEY = 'auth.user';

export class AuthService {

    getUser() {
        const obj = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
        if (obj) {
            return new User(obj.id, obj.name, obj.role);
        }
        return null;
    }

    saveUser(user) {
        if (!(user instanceof User)) {
            throw new Error('user argument must be instance of User class');
        }
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }

    isAuthenticated() {
        return this.getUser() !== null;
    }
}
