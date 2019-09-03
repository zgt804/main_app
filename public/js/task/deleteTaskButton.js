function getDeleteTaskButton () {
    return {
        view: 'button',
        id: 'deleteTaskButton',
        value: 'Удалить',
        type: 'label',
        css: 'webix_primary',
        css: 'webix_danger',
        disabled: true,
        click: deleteTaskPopButton
    }
}