function getFilterProject () {
    return {
        view: 'select',
        id: 'filterProject',
        label: 'Сортировать по',
        labelWidth: 120,
        value: 1,
        options: ['новые', 'в работе', 'завершенные'],
        css: 'mar'
    }
}