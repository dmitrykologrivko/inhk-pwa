export const STUDENT_USER_ROLE = 'student';
export const TEACHER_USER_ROLE = 'teacher';

export class User {
    constructor(id, name, role) {
        if (!(id || name || role)) {
            throw new Error('All fields required for user model');
        }
        if (!User.#validateRole(role)) {
            throw new Error('Provided user role is not valid');
        }

        this.id = id;
        this.name = name;
        this.role = role;
    }

    static #validateRole(role) {
        if (role === STUDENT_USER_ROLE) {
            return true;
        }
        return role === TEACHER_USER_ROLE;
    }

    isStudent() {
        return this.role === STUDENT_USER_ROLE;
    }

    isTeacher() {
        return this.role === TEACHER_USER_ROLE;
    }
}
