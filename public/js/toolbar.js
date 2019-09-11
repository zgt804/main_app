function getToolbar() {
    return {
        view: 'toolbar',
        id: 'toolbarMenu',
        cols:[
            {},
            {view: 'button', id: 'employeeModeWorker', value: 'Режим сотрудника', width: 200, click: employeeModeFunc},
            {view: 'button', id: 'employeeModeHirer', value: 'Режим работодателя', width: 200, click: employeeModeFunc},
            {view: 'button', id: 'employeeExit', value: 'Выйти', width: 100, click: exitButton}
        ],
        css: 'toolbarMenu'
    }
}