const EmployeeModel = {

    getAll: () => {
        return fetch('/employee', {method: 'GET'})
            .then(response => response.json())
    },

}