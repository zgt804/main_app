const EmployeeModel = {

    getAll: () => {
        return fetch('/employee', {method: 'GET'})
            .then(response => response.json())
    },

    getUser: () => {
        return fetch('/user', {method: 'GET'})
            .then(response => response.json())
    },

    login: (user) => {
        return fetch(`/login`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)})
            .then(response => response.text())
    },

    logout: () => {
        return fetch('/logout', {method: 'GET'})
            .then(response => response.text())
    },

}