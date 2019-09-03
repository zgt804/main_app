function getDeleteProjectButton () {
    return {
        view: 'button',
        id: 'deleteProjectButton',
        value: 'Удалить',
        type: 'label',
        css: 'webix_danger',
        disabled: true,
        click: deleteProjectPopButton
    }
}