export class Select {
    constructor() {

    }

    render() {
        return `<div class="form-group">
                    <lable for="urgency">Select urgency</lable>
                    <select class="form-control visit-form-input" id="urgency" name="urgency">
                        <option value="normal">Normal</option>
                        <option value="priority">Priority</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>`
    };

};


export class Input {
    constructor(props) {

        for (let key in props) {
            this[key] = props[key];
        }
    }

    render() {
        return Object.entries(this)
            .map(([key, value]) => {
                return `<div class="form-group">
                            <lable for="${key}">${value}</lable>
                            <input class="form-control visit-form-input" id="${key}" name="${key}">
                        </div>`
            }).join('');
    }
    static resetInput(input){
        input.value = '';
    }
}

export class Button {
    constructor() {
    }
    static createVisitButton(){
        return `<button id="createVisit" class="btn btn-outline-light" data-target="#createVisitModal" data-toggle="modal">Create Visit</button>`
    }
}