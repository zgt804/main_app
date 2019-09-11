function getFilterTask () {
    return {
        view: 'select',
        label: 'Сортировать по',
        id: 'filterTask',
        labelWidth: 120,
        value: 1,
        options: ['', 'Новая', 'Назначенная', 'В работе', 'Завершенная'],
        css: 'mar',
    }
}