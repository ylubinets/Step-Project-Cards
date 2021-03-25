export class Ajax {
    constructor() {
    }

    static async postRequest (object, url, token) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response.json();
    }
    static async putRequest (object, cardId){
        const response = await fetch(`https://ajax.test-danit.com/api/cards/${cardId}`, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return await response.json();
    }

    static async deleteRequest(id) {
        const response = await fetch(`https://ajax.test-danit.com/api/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return true
    }

    static async getRequest() {

        const response = await fetch(`https://ajax.test-danit.com/api/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return await response.json();
    }
}