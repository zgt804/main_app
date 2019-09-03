function getEditProjectButton () {
    return {
        view: 'button',
        id: 'editProjectButton',
        value: 'Редактировать',
        type: 'label',
        css: 'webix_primary',
        disabled: true,
        popup: 'editProjectPop'
    }
}