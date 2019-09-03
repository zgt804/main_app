package providers

import (
	"my-app/app/mappers"
	"my-app/app/structures"
	"my-app/app/connection"
)

func EmployeeGetAll() ([]*structures.Employee, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.EmployeeGetAll(db)
}