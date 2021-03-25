import {Button, Input} from "./modules/FormComponents.js";
import {Ajax} from "./modules/ClassAjax.js";
/*The whole authorisation*/
import {User} from "./modules/ClassUser.js";
/*Creation of a card*/
import {Card} from "./modules/ClassCard.js";
import {DragAndDrop} from "./modules/ClassDragAndDrop.js";
import {Filter} from "./modules/ClassFilter.js";

const modalForm = document.getElementById('formContent');
modalForm.addEventListener('click', createVisitOnBtnClick);

async function createVisitOnBtnClick(event) {
    const {RenderByDoctor} = await import('./modules/ClassRenderByDoctor.js');
    const {CreateVisitForm} = await import('./modules/CreateVisitForm.js');
    const {target: doctor} = event;
    const wrapper = document.getElementById('wrapper');
    const modal = document.getElementById('createVisitModal');

    if (doctor.value === 'dentist' || doctor.value === 'therapist' || doctor.value === 'cardiologist') {
        new RenderByDoctor(doctor.value).render(wrapper);
    } else if (!modal.classList.contains('show')) {
        new CreateVisitForm().clearInputs('wrapper');
    }
    document.getElementById('noItemsAdded').classList.add('disable');
}

const submitVisitFormBtn = document.getElementById('createVisitBtn');


async function visitFormOnSubmit() {
    const {CreateVisitForm} = await import('./modules/CreateVisitForm.js');
    const card = await new CreateVisitForm().getObj('visit-form-input');
    const response = await new CreateVisitForm().formSubmit(card);

    console.log('Response --->', response);
    return response;
}

function  onDragAndDrop() {
    const cards = document.querySelectorAll('.card-container');
    const dnd = new DragAndDrop();

    cards.forEach(function (item) {
        item.addEventListener('dragstart', dnd.handleDragStart.bind(dnd), false);
        item.addEventListener('dragover', dnd.handleDragOver.bind(dnd), false);
        item.addEventListener('drop', dnd.handleDrop.bind(dnd), false);
        item.addEventListener('dragend', dnd.handleDragEnd.bind(dnd), false);
        item.addEventListener('dragenter', dnd.handleEnter.bind(dnd), false);
        item.addEventListener('dragleave', dnd.handleLeave.bind(dnd), false);
    });
}

let closeButton = document.getElementById('closeButton');

let closeIconButton = document.getElementById('closeIconButton');

closeButton.addEventListener('click', clearInputs);
closeIconButton.addEventListener('click', clearInputs);

function clearInputs () {
    let email = document.getElementById('exampleInputEmail1');
    let password = document.getElementById('exampleInputPassword1');

    Input.resetInput(email);
    Input.resetInput(password);
}

/*The whole authorisation*/

let authoriseButton = document.getElementById('authorise');
let allCardsContainer = document.getElementById('allCardsContainer');

authoriseButton.addEventListener('click', async function (event) {
    let token = await new User().getToken();
    if (token !== undefined) {
        localStorage.setItem('token', token);
        console.log('token -->>', token)
        document.getElementById('logInHtml').remove();
        document.getElementById('placeForCreateVisitButton').innerHTML = Button.createVisitButton();
        document.getElementById('filter-container').style.display = 'block';

        let allCardsFromDataBase = Card.getAllCards();
        console.log('This is a promise with all cards from the server', allCardsFromDataBase);
        allCardsFromDataBase
            .then(function (array) {
                if (array.length !== 0) {
                    document.getElementById('noItemsAdded').classList.add('disable')
                    array.forEach(function (element) {
                        allCardsContainer.insertAdjacentHTML("beforeend", `${Card.createCard(element)}`);
                    })
                } else {
                    document.getElementById('noItemsAdded').classList.remove('disable');
                }
            })
            .then(onDragAndDrop);
    }
})

submitVisitFormBtn.addEventListener('click', async function (e) {
    let card = await visitFormOnSubmit();
    allCardsContainer.insertAdjacentHTML("beforeend", Card.createCard(card));
    onDragAndDrop();

})

/*Buttons operations*/

allCardsContainer.addEventListener('click', function (event) {
    const element = event.target;
    if (element.dataset.action === "delete") {
        console.log('card deleted from DOM');
        (element.closest('div')).remove();
        console.log('card deleted from Server',
            Card.deleteCard(element.closest('div').id));
    } else if (element.dataset.action === "show") {
        element.nextElementSibling.classList.toggle('toggle'); /*toggle the info*/
    } else if (element.dataset.action === "edit") {
        let editBtn = element;
        editBtn.addEventListener('click', function (event) {
            editBtn.style.display = 'none';
            let saveBtn = editBtn.nextElementSibling;
            saveBtn.style.display = 'inline';
            let card = this.closest('div');
            card.style.borderColor = 'red';
            let content = card.lastElementChild;
            let inputs = content.children;
            let editedContent = Card.editCard(card);
            saveBtn.addEventListener('click', function () {
                card.style.borderColor = 'black';
                let contentToServer = Card.prepareEditedCard(editedContent, inputs);
                Ajax.putRequest(contentToServer, card.id)
                    .then(function (newCard) {
                        console.log('this is a new Card sent to server', newCard)
                    })
            })
        })
    } else if (element.dataset.action === "save") {
        element.style.display = 'none';
        element.previousElementSibling.style.display = 'inline-block';

    }
})

/*Filter*/

let searchBtn = document.getElementById('searchRequest');

searchBtn.addEventListener('click', function (){
    let doctorValue = Filter.getValue(document.getElementById('selectDoctor'));
    let urgencyValue = Filter.getValue(document.getElementById('selectUrgency'));
    let allCardsContainer = document.getElementById('allCardsContainer');

    while (allCardsContainer.firstChild) {
        allCardsContainer.removeChild(allCardsContainer.firstChild);
    }

    let allCardsFromServer = Card.getAllCards();
    allCardsFromServer.then(function (array){
        array.forEach(function (element) {
            Filter.filterInProcess(element, doctorValue, urgencyValue, allCardsContainer);
            onDragAndDrop();
        })
    })

})