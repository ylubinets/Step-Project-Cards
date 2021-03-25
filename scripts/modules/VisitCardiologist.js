import {Visit} from "./ClassVisit.js";

export class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.fields = [
            {
                pressure: 'Normal pressure',
                bodyWeight: 'Body weight index',
                Illnesses: 'Past illnesses of the cardiovascular system',
                age: 'Age'}
                ];
    }



}