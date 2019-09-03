function getTasks () {
    return {
        view: 'tree',
        id: 'tasks',
        template: '{common.icon()}&nbsp;#name#',
        select: true,
    }
}