export class User {
    id: number;
    email: string;
    password: string;

    constructor (values: Object = {}) {
        Object.assign(this, values);
    }
}
