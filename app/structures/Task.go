package structures

type Task struct {
	Id          int     `json:"id"`
	ProjectId   int     `json:"project_id"`
	EmployeeId  int     `json:"employee_id"`
	AuthorId    int     `json:"author_id"`
	ParentTask  int     `json:"parent_task"`
	CreateDate  string  `json:"create_date"`
	FinishDate  string  `json:"finish_date"`
	Priority    int     `json:"priority"`
	Worktime    int     `json:"worktime"`
	State       int     `json:"state"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Data        []*Task `json:"data"`
	Open        bool    `json:"open"`
}
