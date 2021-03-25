import {Ajax} from "./ClassAjax.js";

let token = localStorage.getItem('token');

export class Card extends Ajax{
    constructor() {
        super ()
    }

    static async getAllCards() {
        return await Card.getRequest();
    }

    static async deleteCard(id) {
        return await Card.deleteRequest(id);
    }

    static createCard(object) {
        let cardID = object.id;
        let {content} = object;
        let {doctor, urgency, ...rest} = content;

        return `
<div class="card-container" id="${cardID}" draggable="true">
                <p class="card-id">Visit # ${cardID}</p>
                <button type="button" data-action="delete" class="btn btn-danger" id="deleteBtn">DELETE</button>
                <button type="button" data-action="edit" class="btn btn-warning" id="editBtn">EDIT</button>
                <button type="button" style="display: none" data-action="save" class="btn btn-success" id="saveBtn">SAVE</button>
                <button type="button" data-action="show" class="btn btn-primary" id="toggleBtn">MORE</button>
                <div class="info-hidden">
                ${Object.entries({doctor, urgency, ...rest})
            .map(([key, value]) =>
                `
                <label class="label-margin">${key}</label><input class="card-input" type="text" name="${key}" value="${value}" readonly="true">`).join('')}
                </div>
</div>
`
    }

    static editCard(card) {
        let editedContent = {};
        let lastNode = card.closest('div').lastElementChild;
        let inputs = lastNode.children;

        for (let element of inputs) {
            element.removeAttribute('readonly');
            element.onchange = function () {
                editedContent[element.name] = element.value;
            }
        }
        return editedContent;
    }
    static prepareEditedCard (object, inputs){
        for (let element of inputs){
            object[element.name] = element.value;
            element.setAttribute('readonly', 'true');
        }
        return object
    }
}