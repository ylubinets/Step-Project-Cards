import {Card} from "./ClassCard.js";

export class Filter {
    constructor() {
    }
    static getValue(element){
        let index = element.options.selectedIndex;
        return element.options[index].value;
    }

    static filteredElement(element, parentElement){
        parentElement.insertAdjacentHTML("beforeend", Card.createCard(element));
    }

    static filterInProcess (element, valueDoctor, valueUrg, parentElement){
        if (valueDoctor === 'nothing' && valueUrg === 'nothing'){
            Filter.filteredElement(element, parentElement);
        } else if (element.content.urgency === valueUrg && element.content.doctor === valueDoctor){
            Filter.filteredElement(element, parentElement)
        } else if (element.content.doctor === valueDoctor && valueUrg === 'nothing'){
            Filter.filteredElement(element, parentElement);
        } else if (element.content.urgency === valueUrg && valueDoctor === 'nothing') {
            Filter.filteredElement(element, parentElement);
        }
    }
}