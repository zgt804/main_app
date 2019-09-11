package structures

type User struct {
	Id         int    `json:"id"`
	Login      string `json:"login"`
	Pass       string `json:"pass"`
	EmployeeId int    `json:"employee_id"`
}
