package mappers

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"my-app/app/structures"
)

// получение всех сотрудников
func EmployeeGetAll(db *sql.DB) ([]*structures.Employee, error) {

	var employees []*structures.Employee
	rows, err := db.Query(`
		SELECT * FROM employee
`)
	if err != nil {
		return employees, err
	}
	defer rows.Close()
	for rows.Next() {
		c := structures.Employee{}
		err := rows.Scan(&c.Id, &c.LastName, &c.FirstName, &c.MiddleName, &c.BirthDate, &c.Email, &c.Phone)
		if err != nil {
			return employees, err
		}

		employees = append(employees, &c)
	}

	if err = rows.Err(); err != nil {
		log.Println(err)
	}

	return employees, err
}