import {Select, Input} from "./FormComponents.js";

export class Visit {
    constructor() {
    }

    fields = [
        {
            purpose: 'Purpose of visit',
            name:'Name and Surname',
            details: 'Visit details'
        }
    ];

    renderInputs(element) {
    let inputField = ''

       this.fields.forEach(item => {
           inputField += new Input(item).render();
       })
        return inputField;
    };

    renderSelect(element) {
        return new Select().render();

    };

    log() {
        this.fields.forEach(item => {
            const newInput = new Input(item).log();
        })
    };

}