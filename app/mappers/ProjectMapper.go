package mappers

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"my-app/app/structures"
)

// получение всех сотрудников
func ProjectGetAll(db *sql.DB) ([]*structures.Project, error) {

	var projects []*structures.Project
	rows, err := db.Query(`
		SELECT * FROM project
`)
	if err != nil {
		return projects, err
	}
	defer rows.Close()
	for rows.Next() {
		c := structures.Project{}
		err := rows.Scan(&c.Id, &c.Name)
		if err != nil {
			return projects, err
		}

		projects = append(projects, &c)
	}

	if err = rows.Err(); err != nil {
		log.Println(err)
	}

	return projects, err
}

//noinspection ALL
func ProjectCreate(db *sql.DB, project structures.Project) ([]*structures.Project, error) {

	var projects []*structures.Project
	c := structures.Project{}
	err := db.QueryRow(`
		INSERT INTO project (name) 
		VALUES ($1) returning id, name
	`, project.Name).Scan(&c.Id, &c.Name)
	if err != nil {
		return projects, err
	}

	projects = append(projects, &c)

	return projects, err
}

func ProjectDelete(db *sql.DB, id int) (int, error) {

	_, err := db.Exec(`
		DELETE FROM project WHERE id = $1
	`, id)
	if err != nil {
		return id, err
	}
	return id, err
}

func ProjectUpdate(db *sql.DB, project structures.Project) ([]*structures.Project, error) {

	var projects []*structures.Project
	c := structures.Project{}
	_, err := db.Exec(`
		UPDATE project SET name=$2 WHERE id=$1
	`, project.Id, project.Name)
	if err != nil {
		return projects, err
	}
	c.Id = project.Id
	c.Name = project.Name
	projects = append(projects, &c)

	return projects, err
}