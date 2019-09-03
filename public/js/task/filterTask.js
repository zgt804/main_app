function getFilterTask () {
    return {
        view: 'select',
        label: 'Сортировать по',
        id: 'filterTask',
        labelWidth: 120,
        value: 1,
        options: ['назначенные', 'новые', 'в работе', 'завершенные', 'отклоненные'],
        css: 'mar'
    }
}