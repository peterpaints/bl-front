export class Bucket {
    id: number;
    name: string = '';
    items: object[] = [];
    created_by: number;

    constructor (values: Object = {}) {
        Object.assign(this, values);
    }
}
