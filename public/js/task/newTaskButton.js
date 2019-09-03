function getNewTaskButton () {
    return {
        view: 'button',
        id: 'newTaskButton',
        value: 'Новая задача',
        type: 'label',
        css: 'webix_primary',
        popup: 'newTaskPop',
        disabled: true
    }
}