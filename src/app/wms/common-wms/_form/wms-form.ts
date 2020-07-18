export abstract class WmsForm {
    constructor() {
        this.uid = '';
    }
    protected uid: string;
    setInitValue(dataObject: any) {
        for (let key of Object.keys(this)) {
            this[key] = dataObject[key] || '';
        }
    }
    abstract toRSQL(): string;

}
