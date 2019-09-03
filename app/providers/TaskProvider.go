package providers

import (
	"my-app/app/connection"
	"my-app/app/mappers"
	"my-app/app/structures"
)

func TaskGetAll() ([]*structures.Task, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.TaskGetAll(db)
}

func GetTaskForProject(id structures.TaskTree) ([]*structures.Task, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.GetTaskForProject(db, id)
}

func TaskCreate(task structures.Task) ([]*structures.Task, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.TaskCreate(db, task)
}

func TaskUpdate(task structures.Task) ([]*structures.Task, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.TaskUpdate(db, task)
}