package mappers

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"my-app/app/structures"
)


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

func UserLogin(db *sql.DB, user structures.User) ([]*structures.User, error) {

	var users []*structures.User
	rows, err := db.Query(`
		SELECT * FROM users WHERE login=$1 AND pass=$2
	`, user.Login, user.Pass)
	if err != nil {
		return users, err
	}
	defer rows.Close()

	for rows.Next() {
		c := structures.User{}
		err := rows.Scan(&c.Id, &c.Login, &c.Pass, &c.EmployeeId)
		if err != nil {
			return users, err
		}
		users = append(users, &c)
	}


	return users, err
}

