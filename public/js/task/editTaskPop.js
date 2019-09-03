function getEditTaskPopEdit () {
    return {
        view: 'window',
        id: 'editTaskPopEdit',
        close: true,
        modal: true,
        head: 'Редактирование задачи',
        width: 500,
        position: 'center',
        move: true,
        body: {
            view: 'form',
            width: 500,
            elements:[
                { view: 'text', id: 'editTaskName', label: 'Название', labelWidth: 130},
                { view: 'textarea', id: 'editTaskText', label: 'Описание', labelWidth: 130},
                { view: 'text', id: 'editTaskAuthor', label: 'Автор', labelWidth: 130, disabled: true},
                { view: 'select', id: 'editTaskEmployee', label: 'Сотрудник', options: newEmployees, labelWidth: 130},
                { view: 'text', id: 'editTaskCreateDate', label: 'Дата создания', labelWidth: 130, disabled: true},
                { view: 'text', id: 'editTaskFinishDate', label: 'Дата завершения', labelWidth: 130, disabled: true},
                { view: 'select', id: 'editTaskPriority', label: 'Приоритет', options: ['1','2','3'], labelWidth: 130},
                { view: 'counter', id: 'editTaskWorktime', label: 'Трудозатраты', labelWidth: 130, step: 1, value: 0, max: 100},
                { view: 'button', id: 'editTaskEdit', value: 'Редактировать', css: 'webix_primary', click: editTaskTree},
                { view: 'button', id: 'editTaskCompletion', value: 'Завершить', css: 'webix_primary', disabled: true, click: editTaskTree}
            ]
        }
    }
}

function getEditTaskPopConfirm () {
    return {
        view: 'window',
        id: 'editTaskPopConfirm',
        close: true,
        modal: true,
        head: 'Редактирование задачи',
        width: 500,
        position: 'center',
        move: true,
        body: {
            view: 'form',
            width: 500,
            elements:[
                { view: 'text', id: 'editTaskNameC', label: 'Название', labelWidth: 130, disabled: true},
                { view: 'textarea', id: 'editTaskTextC', label: 'Описание', labelWidth: 130, disabled: true},
                { view: 'text', id: 'editTaskAuthorC', label: 'Автор', labelWidth: 130, disabled: true},
                { view: 'select', id: 'editTaskEmployeeC', label: 'Сотрудник', options: newEmployees, labelWidth: 130, disabled: true},
                { view: 'text', id: 'editTaskCreateDateC', label: 'Дата создания', labelWidth: 130, disabled: true},
                { view: 'text', id: 'editTaskFinishDateC', label: 'Дата завершения', labelWidth: 130, disabled: true},
                { view: 'select', id: 'editTaskPriorityC', label: 'Приоритет', options: ['1','2','3'], labelWidth: 130, disabled: true},
                { view: 'counter', id: 'editTaskWorktimeC', label: 'Трудозатраты', labelWidth: 130, step: 1, value: 0, max: 100},
                {cols: [
                    { view: 'button', id: 'editTaskConfirm', value: 'Принять', css: 'webix_primary', click: editTaskTree},
                    { view: 'button', id: 'editTaskDecline', value: 'Отказаться', css: 'webix_danger', click: editTaskTree},
                ]}
            ]
        }
    }
}