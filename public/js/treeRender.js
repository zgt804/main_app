
let userID = 0; // инициализация переменной id учетной записи сотрудника

let employeeMode = 1; // инициализация переменной режима работы дерева задач (режим сотрудника/режим работодателя)

let newEmployees = []; // инициализация массива всех сотрудников

let newState = ['', 'Новая', 'Назначенная', 'В работе', 'Завершенная']; // инициализация массива статуса задачи


/*
///////////////////////////////// Строим дерево задач относительно выбранного проекта////////////////////////////////////
*/


function buildProjectTree(id) {
    TaskModel.treeBuild(id).then(function (result) {
        if(result != null) {
            colorizeTree(result);
            taskTree.clearAll();
            taskTree.parse(result, 'json');
            taskTree.refresh();
        } else {
            taskTree.clearAll();
            taskTree.refresh();
        }
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
////////////////////////////////Удаление проекта//////////////////////////////////
*/

function deleteProjectPopButton() {
    let selectedProject = projectList.getSelectedItem();
    ProjectModel.delete(selectedProject.id).then(function(result) {
        projectList.remove(result);
        taskTree.clearAll();
        taskTree.refresh();
    });
}

/*
////////////////////////////////////Добавление новой задачи/////////////////////////////////
*/

// возвращаем текущую дату и время
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
        author_id : userID,
        parent_task : Number(newTaskInputHiddenTask['value']),
        create_date : createDatepicker(),
        finish_date : $$('endDatePicker').getValue(),
        priority : Number($$('selectPriority').getValue()),
        name : $$('selectTaskName').getValue(),
        description : $$('selectTaskDesc').getValue()
    };

    if (task.employee_id == 0) { // если задача никому не назначена, то ее статус будет "новая", иначе "назначенная"
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
///////////////////////////////////////////Переключение между режимом сотрудника-работодателя//////////////////////////////
*/

function employeeModeFunc(id) {
    let projId = Number(newTaskInputHiddenProject['value']);
    if(id == 'employeeModeWorker') {
        employeeMode = 1;
    } else {
        employeeMode = 2;
    }
    buildProjectTree(projId);
}

/*
///////////////////////////////////////////Раскрашиваем дерево задач//////////////////////////////
*/

function colorizeTree(res) {
    if(employeeMode == 1) {
        for(let i = 0; i < res.length; i++) {
            if(res[i]['employee_id'] == userID) { // раскрашиваем задачи определенного пользователя
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
                if(res[i]['data'] != null) { // раскрашиваем дочерние задачи
                    colorizeTree(res[i]['data']);
                }
            }
        }
    } else { // раскрашиваем задачи всех пользователей
        for(let i = 0; i < res.length; i++) {
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
    };

    if(id == 'editTaskDecline') { // если пользователь отклонил назначенную задачу
        taskUp.state = 1;
        taskUp.worktime = 0;
        taskUp.employee_id = 0;
    } else if (id == 'editTaskConfirm') { // если пользователь взял в работу назначенную задачу
        taskUp.state = 3;
        taskUp.worktime = Number($$('editTaskWorktimeC').getValue());
    } else if (id == 'editTaskCompletion') { // если пользователь завершил взятую в работу задачу
        taskUp.state = 4;
    } else {
        if(selectedTask.employee_id != Number($$('editTaskEmployee').getValue())) { // если задача была перенаправлена другому исполнителю
            taskUp.state = 2;
        }
        if (Number($$('editTaskEmployee').getValue()) == 0) {  // если пользователь сделал задачу новой
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
/////////////////////////////////////////// Поиск задачи по фильтру ///////////////////////////////////////////
*/

function filterTree(id) {
    TaskModel.search(id).then(function (result) {
        if(result != null) {
            colorizeTree(result);
            taskTree.clearAll();
            taskTree.parse(result, 'json');
            taskTree.refresh();
        } else {
            taskTree.clearAll();
            taskTree.refresh();
        }
    });
}

/*
/////////////////////////////////////////// Загрузка данных ///////////////////////////////////////////
*/

// загрузка всех существующих сотрудников
function requestEmployees () {
    EmployeeModel.getAll().then(function (result) {
        let obj = {id:0, value: 'Никому'};
        newEmployees.push(obj);  // добавляем возможность создания новой задачи путем назначения ни одному из сотрудников
        for(let i = 0; i < result.length; i++) {
            obj = {};
            obj['id'] = result[i]['id'];
            obj['value'] = result[i]['first_name'] + ' ' + result[i]['last_name'];
            newEmployees.push(obj); // добавляем в массив всех сотрудников
        }
    });
}

// загрузка всех существующих проектов
function requestProjects () {
    ProjectModel.getAll().then(function (result) {
        projectList.clearAll();
        projectList.parse(result, 'json');
        projectList.refresh();
    });
}

// под чьей учетной записью выполнен вход
function requestUser () {
    EmployeeModel.getUser().then(function (result) {
        userID = result.employee_id;
        userName = result.login;
        $$('toolbarUser').setHTML('<p style="color: #FFF; margin-left: 30px; margin-top: 7px; font-size: 20px;">Привет, ' + userName + '!</p>');
    });
}

/*
/////////////////////////////////////////// Логин-Логаут ///////////////////////////////////////////
*/

function logIn() {
    let user = {
        login: $$('login').getValue(),
        pass: $$('password').getValue()
    };
    EmployeeModel.login(user).then(function (result) {
       if(result == "null") {
           webix.message("Неверный логин и/или пароль");
       } else {
           window.location.replace("/");
       }
    });
}


function exitButton() {
    EmployeeModel.logout().then(function (result) {
        webix.message(result);
        window.location.replace("./auth");
    });
}