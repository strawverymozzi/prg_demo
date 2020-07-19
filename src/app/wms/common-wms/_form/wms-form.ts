export abstract class WmsForm {
    constructor() {
        this.uid = '';
        this.tenant = '';

    }
    protected uid: string;
    protected tenant: string;

    setInitValue(dataObject: any) {
        for (let key of Object.keys(this)) {
            this[key] = dataObject[key] || '';
        }
    }
    abstract toRSQL(): string;

}
