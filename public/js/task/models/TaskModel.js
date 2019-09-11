const TaskModel = {

    getAll: () => {
        return fetch('/task', {method: 'GET'})
            .then(response => response.json())
    },

    treeBuild: (id) => {
        return fetch(`/task/query`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({Id: id})})
            .then(response => response.json())
    },

    create: (task) => {
        return fetch('/task', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(task)})
            .then(response => response.json())
    },

    update: (item) => {
        return fetch(`/task`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
            .then(response => response.json())
    },

    search: (id) => {
        return fetch(`/task/search`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({Id: id})})
            .then(response => response.json())
    }
}