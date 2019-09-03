function getEditProjectPop () {
    return {
        view: 'popup',
        id: 'editProjectPop',
        body: {
            view: 'form',
            width: 400,
            elements:[
                { view: 'text', id: 'editProjectPopText', label: 'Название'},
                { view: 'button', id: 'editProjectPopButton', value: 'Редактировать', click: editProjectPopButton},
            ]
        }
    }
}