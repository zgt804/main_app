package structures

type Employee struct {
	Id         int    `json:"id"`
	LastName   string `json:"last_name"`
	FirstName  string `json:"first_name"`
	MiddleName string `json:"middle_name"`
	BirthDate  string `json:"birth_date"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
}
