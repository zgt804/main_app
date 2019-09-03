/*
///////////////////////////////// Строим дерево задач относительно выбранного проекта////////////////////////////////////
*/


function buildProjectTree(id) {
    TaskModel.treeBuild(id).then(function (result) {
        colorizeTree(result);
        taskTree.clearAll();
        taskTree.parse(result, 'json');
        taskTree.refresh();
    });
}



/*
////////////////////////////////Добавление проекта//////////////////////////////////
*/


function newProjectPopButton() {

    let project = {
        Name: $$('newProjectPopText').getValue()
    }

    ProjectModel.create(project).then(function (result) {
        projectList.add({
            id: result[0]['id'],
            name: result[0]['name']
        });
    });
}



/*
////////////////////////////////Редактирование проекта//////////////////////////////////
*/

function editProjectPopButton() {
    let selectedProject = projectList.getSelectedItem();

    let projectUp = {
        Id: selectedProject.id,
        Name: $$('editProjectPopText').getValue()
    }

    ProjectModel.update(projectUp).then(function(result) {
        projectList.getItem(result[0]['id']).name = result[0]['name'];
        projectList.refresh();
    });
}

/*
////////////////////////////////Удаление проекта//////////////////////////////////------------------------Доработать удаление задач
*/

function deleteProjectPopButton() {
    let selectedProject = projectList.getSelectedItem();
    ProjectModel.delete(selectedProject.id).then(function(result) {
        projectList.remove(result);
    });
}

/*
////////////////////////////////////Добавление новой задачи/////////////////////////////////
*/

function createDatepicker () {
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    return date
}

function newTaskPopButton() {

    let task = {
        project_id : Number(newTaskInputHiddenProject['value']),
        employee_id : Number($$('selectEmployee').getValue()),
        author_id : 2,
        parent_task : Number(newTaskInputHiddenTask['value']),
        create_date : createDatepicker(),
        finish_date : $$('endDatePicker').getValue(),
        priority : Number($$('selectPriority').getValue()),
        name : $$('selectTaskName').getValue(),
        description : $$('selectTaskDesc').getValue()
    };

    if (task.employee_id == 0) {
        task.state = 1;
    } else {
        task.state = 2;
    }

    TaskModel.create(task).then(function (result) {
        colorizeTree(result);
        taskTree.add(result[0], 0, result[0]['parent_task']);
    });
}

/*
///////////////////////////////////////////Раскрашиваем дерево задач//////////////////////////////
*/

function colorizeTree(res) {
    for(let i = 0; i < res.length; i++) {
        if(res[i]['employee_id'] == 1) {
            let today = new Date();
            let dateFromDB = new Date(res[i]['finish_date']);
            switch(res[i]['state']) {
                case 1:
                    res[i]['$css'] = 'black';
                    break;
                case 2:
                    res[i]['$css'] = 'green';
                    break;
                case 3:
                    res[i]['$css'] = 'yellow';
                    if(today > dateFromDB) {
                        res[i]['$css'] = 'red';
                    }
                    break;
                case 4:
                    res[i]['$css'] = 'blue';
                    break;
            }
            if(res[i]['data'] != null) {
                colorizeTree(res[i]['data']);
            }
        }
    }
}


/*
//////////////////////////////////////////Редактирование задачи///////////////////////////////////////
*/

function editTaskTree(id) {

    let selectedTask = taskTree.getSelectedItem();

    let taskUp = {
        id : selectedTask.id,
        employee_id : selectedTask.employee_id,
        priority : selectedTask.priority,
        state : selectedTask.state,
        worktime : selectedTask.worktime,
        name : selectedTask.name,
        description : selectedTask.description,
        finish_date : selectedTask.finish_date
    }

    if(id == 'editTaskDecline') {
        taskUp.state = 1;
        taskUp.worktime = 0;
        taskUp.employee_id = 0;
    } else if (id == 'editTaskConfirm') {
        taskUp.state = 3;
        taskUp.worktime = Number($$('editTaskWorktimeC').getValue());
    } else if (id == 'editTaskCompletion') {
        taskUp.state = 4;
    } else {
        if(selectedTask.employee_id != Number($$('editTaskEmployee').getValue())) {
            taskUp.state = 2;
        }
        if (Number($$('editTaskEmployee').getValue()) == 0) {
            taskUp.state = 1;
        }
        taskUp.employee_id = Number($$('editTaskEmployee').getValue());
        taskUp.priority = Number($$('editTaskPriority').getValue());
        taskUp.worktime = Number($$('editTaskWorktime').getValue());
        taskUp.name = $$('editTaskName').getValue();
        taskUp.description = $$('editTaskText').getValue();
    }

    TaskModel.update(taskUp).then(function (result) {
        colorizeTree(result);
        selectedTask.name = result[0].name;
        selectedTask.description = result[0].description;
        selectedTask.employee_id = result[0].employee_id;
        selectedTask.priority = result[0].priority;
        selectedTask.state = result[0].state;
        selectedTask.worktime = result[0].worktime;
        selectedTask['$css'] = result[0]['$css'];
        taskTree.refresh();
    });
}

/*
/////////////////////////////////////////// Реквесты ///////////////////////////////////////////
*/

function requestEmployees () {
    EmployeeModel.getAll().then(function (result) {
        let obj = {id:0, value: 'Никому'};
        newEmployees.push(obj);
        for(let i = 0; i < result.length; i++) {
            obj = {};
            obj['id'] = result[i]['id'];
            obj['value'] = result[i]['first_name'] + ' ' + result[i]['last_name'];
            newEmployees.push(obj);
        }
    });
}

function requestProjects () {
    ProjectModel.getAll().then(function (result) {
        projectList.clearAll();
        projectList.parse(result, 'json');
        projectList.refresh();
    });
}



function requestTasks () {
    TaskModel.getAll().then(function (result) {
        taskTree.clearAll();
        taskTree.parse(result, 'json');
        taskTree.refresh();
    });
}