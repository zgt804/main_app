function getTasks () {
    return {
        view: 'treetable',
        id: 'tasks',
        columns:[
            {id: "name", header: "Название", width: 250,
                template: '{common.treetable()}&nbsp;#name#'},
            {id: "employee_id", header: "Задача назначена", width: 150,
                template: function(obj) {
                    return newEmployees[obj.employee_id].value;
                }
            },
            {id: "worktime", header: "Трудозатраты в часах", width: 175},
            {id: "state", header: "Статус", width: 150,
                template: function(obj) {
                    return newState[obj.state];
                }
            }
        ],
        select: true,
    }
}