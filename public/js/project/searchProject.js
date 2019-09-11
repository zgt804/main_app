function getSearchProject () {
    return {
        view: "text", label: "Поиск", labelWidth: 55,
        on: {
            onTimedKeyPress: function() {
                debugger
                var value = this.getValue().toLowerCase();
                if (!value)
                    requestProjects();
                else {
                    var result = projectList.find(function(obj){
                        return obj.name.toLowerCase().indexOf(value) != -1;
                    });
                }
                projectList.clearAll();
                projectList.parse(result, 'json');
                projectList.refresh();
            }
        }
    }
}