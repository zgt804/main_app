function getLoginWindow () {
    return {
        view: 'window',
        id: 'loginWindow',
        fullscreen: true,
        head: 'Вход в систему',
        position: 'center',
        body: {
            view: 'form',
            width: 400,
            elements:[
                { view: 'text', id: 'login', label: 'Логин', labelWidth: 130},
                { view: 'text', type: 'password', id: 'password', label: 'Пароль', labelWidth: 130},
                { view: 'button', id: 'enter', value: 'Войти', css: 'webix_primary', click: logIn}
            ]
        }
    }
}