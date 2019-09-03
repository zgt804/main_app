function getNewProjectPop () {
    return {
        view: 'popup',
        id: 'newProjectPop',
        body: {
            view: 'form',
            width: 400,
            elements:[
                { view: 'text', id: 'newProjectPopText', label: 'Название'},
                { view: 'button', id: 'newProjectPopButton', value: 'Создать', click: newProjectPopButton},
            ]
        }
    }
}