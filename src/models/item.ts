export class Item {
    id: number;
    name: string;
    date_created: string;
    date_modified: string;
    bucket_id: number;
    done: boolean=false;

    constructor (values: Object = {}) {
        Object.assign(this, values);
    }
}
