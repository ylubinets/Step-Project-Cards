
export class User {
    constructor(email, password) {
        this.email = document.getElementById('exampleInputEmail1').value;
        this.password = document.getElementById('exampleInputPassword1').value;
        this.url = 'https://ajax.test-danit.com/api/cards/login';

        }
    async getToken () {
        let response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(new User()),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            return alert('Email or password is incorrect!')
        } else {
            return await response.text();
        }
    }
}