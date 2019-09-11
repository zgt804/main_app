package providers

import (
	"my-app/app/mappers"
	"my-app/app/structures"
	"my-app/app/connection"
)

func ProjectGetAll() ([]*structures.Project, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.ProjectGetAll(db)
}

func ProjectCreate(project structures.Project) ([]*structures.Project, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.ProjectCreate(db, project)
}

func ProjectDelete(id int) (int, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return id, err
	}
	defer db.Close()
	mappers.TaskDelete(db, id)
	return mappers.ProjectDelete(db, id)
}

func ProjectUpdate(project structures.Project) ([]*structures.Project, error) {
	db, err := connection.DatabaseConnect()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	return mappers.ProjectUpdate(db, project)
}