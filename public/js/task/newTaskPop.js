function getNewTaskPop () {
    return {
        view: 'popup',
        id: 'newTaskPop',
        width: 400,
        body: {
            view: 'form', 
            elements:[
                {view: 'text', id: 'selectTaskName', label: 'Название', labelWidth: 130},
                {view: 'textarea', id: 'selectTaskDesc', label: 'Описание', labelWidth: 130},
                {view: 'select', id: 'selectEmployee', label: 'Кому назначить', options: newEmployees, labelWidth: 130},
                {view: 'select', id: 'selectPriority', label: 'Приоритет', options: ['1','2','3'], labelWidth: 130},
                {view:"datepicker", id: 'endDatePicker', timepicker: true, label: 'Deadline', stringResult: true},
                {view: 'text', id: 'newTaskPopParentProject', value: 0, hidden: true},
                {view: 'text', id: 'newTaskPopParentTask', value: 0, hidden: true},
                {view: 'button', id: 'newTaskPopButton', value: 'Создать', click: newTaskPopButton},
            ]
        }
    }
}