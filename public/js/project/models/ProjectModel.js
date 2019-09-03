const ProjectModel = {

    getAll: () => {
        return fetch('/project', {method: 'GET'})
            .then(response => response.json())
    },

    create: (project) => {
        return fetch('/project', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(project)})
            .then(response => response.json())
    },

    delete: (Id) => {
    return fetch(`/project/${Id}`, {method: 'DELETE'})
            .then(response => response.json())
    },

    update: (item) => {
        return fetch(`/project`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(item)})
            .then(response => response.json())
    }
}