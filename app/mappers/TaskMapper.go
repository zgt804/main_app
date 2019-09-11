package mappers

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"my-app/app/structures"
	"strconv"
	"strings"
)

//функция для перевода 0 в null
func intToStringStrConv(value int) (s string)  {
	if(value > 0) {
		return strconv.Itoa(value)
	}
	return "null"
}


// получение всех задач
func TaskGetAll(db *sql.DB) ([]*structures.Task, error) {

	var tasks []*structures.Task
	rows, err := db.Query(`
		SELECT * FROM task
`)
	if err != nil {
		return tasks, err
	}
	defer rows.Close()
	for rows.Next() {
		c := structures.Task{}
		employeeIdType := sql.NullInt64{}
		parentTaskType := sql.NullInt64{}
		worktimeType := sql.NullInt64{}
		err := rows.Scan(&c.Id, &c.ProjectId, &employeeIdType, &c.AuthorId, &parentTaskType, &c.CreateDate, &c.FinishDate, &c.Priority, &worktimeType, &c.State, &c.Name, &c.Description)
		if employeeIdType.Valid {
			c.EmployeeId = int(employeeIdType.Int64)
		} else {
			c.EmployeeId = 0
		}
		if parentTaskType.Valid {
			c.ParentTask = int(parentTaskType.Int64)
		} else {
			c.ParentTask = 0
		}
		if worktimeType.Valid {
			c.Worktime = int(worktimeType.Int64)
		} else {
			c.Worktime = 0
		}
		if err != nil {
			return tasks, err
		}


		tasks = append(tasks, &c)
	}

	if err = rows.Err(); err != nil {
		log.Println(err)
	}

	return tasks, err
}

//получение задач относительно проекта
func GetTaskForProject(db *sql.DB, id structures.TaskTree) ([]*structures.Task, error) {

	var tasks []*structures.Task
	rows, err := db.Query(`
		SELECT * FROM task WHERE project_id=$1 ORDER BY id DESC
`, id.Id)
	if err != nil {
		return tasks, err
	}
	defer rows.Close()
	for rows.Next() {
		c := structures.Task{}
		employeeIdType := sql.NullInt64{}
		parentTaskType := sql.NullInt64{}
		worktimeType := sql.NullInt64{}
		err := rows.Scan(&c.Id, &c.ProjectId, &employeeIdType, &c.AuthorId, &parentTaskType, &c.CreateDate, &c.FinishDate, &c.Priority, &worktimeType, &c.State, &c.Name, &c.Description)
		if employeeIdType.Valid {
			c.EmployeeId = int(employeeIdType.Int64)
		} else {
			c.EmployeeId = 0
		}
		if parentTaskType.Valid {
			c.ParentTask = int(parentTaskType.Int64)
		} else {
			c.ParentTask = 0
		}
		if worktimeType.Valid {
			c.Worktime = int(worktimeType.Int64)
		} else {
			c.Worktime = 0
		}
		if err != nil {
			return tasks, err
		}
		tasks = append(tasks, &c)
	}
	if err = rows.Err(); err != nil {
		log.Println(err)
	}

	return tasks, err
}

func TaskCreate(db *sql.DB, task structures.Task) ([]*structures.Task, error) {
	var tasks []*structures.Task
	c := structures.Task{}
	employeeIdType := sql.NullInt64{}
	parentTaskType := sql.NullInt64{}
	worktimeType := sql.NullInt64{}
	var query string
	query = `
		INSERT INTO task (project_id, employee_id, author_id, parent_task, create_date, finish_date, priority, state, name, description) 
		VALUES ($1, {employee_id}, $2, {parent_task}, $3, $4, $5, $6, $7, $8) returning *
	`
	query = strings.ReplaceAll(query, "{employee_id}", intToStringStrConv(task.EmployeeId))
	query = strings.ReplaceAll(query, "{parent_task}", intToStringStrConv(task.ParentTask))

	err := db.QueryRow(query, task.ProjectId, task.AuthorId, task.CreateDate, task.FinishDate, task.Priority, task.State, task.Name, task.Description).Scan(
		&c.Id, &c.ProjectId, &employeeIdType, &c.AuthorId, &parentTaskType, &c.CreateDate, &c.FinishDate, &c.Priority, &worktimeType, &c.State, &c.Name, &c.Description)
	if employeeIdType.Valid {
		c.EmployeeId = int(employeeIdType.Int64)
	} else {
		c.EmployeeId = 0
	}
	if parentTaskType.Valid {
		c.ParentTask = int(parentTaskType.Int64)
	} else {
		c.ParentTask = 0
	}
	if worktimeType.Valid {
		c.Worktime = int(worktimeType.Int64)
	} else {
		c.Worktime = 0
	}
	c.Open = true
	if err != nil {
		return tasks, err
	}

	tasks = append(tasks, &c)

	return tasks, err
}

func TaskUpdate(db *sql.DB, task structures.Task) ([]*structures.Task, error) {
	var tasks []*structures.Task
	c := structures.Task{}
	var query string
	query = `
		UPDATE task SET name=$2, description=$3, employee_id={employee_id}, priority=$4, state=$5, worktime=$6 WHERE id=$1
	`
	query = strings.ReplaceAll(query, "{employee_id}", intToStringStrConv(task.EmployeeId))
	_, err := db.Exec(query, task.Id, task.Name, task.Description, task.Priority, task.State, task.Worktime)
	if err != nil {
		return tasks, err
	}
	c.Id = task.Id
	c.Name = task.Name
	c.Description = task.Description
	c.EmployeeId = task.EmployeeId
	c.Priority = task.Priority
	c.State = task.State
	c.Worktime = task.Worktime
	c.FinishDate = task.FinishDate
	tasks = append(tasks, &c)

	return tasks, err
}

func TaskDelete(db *sql.DB, id int) (int, error) {
	_, err := db.Exec(`
		DELETE FROM task WHERE project_id = $1
	`, id)

	return id, err
}

func TaskSearch(db *sql.DB, id structures.TaskTree) ([]*structures.Task, error) {

	var tasks []*structures.Task
	rows, err := db.Query(`
		SELECT * FROM task WHERE state=$1 ORDER BY id DESC
`, id.Id)
	if err != nil {
		return tasks, err
	}
	defer rows.Close()
	for rows.Next() {
		c := structures.Task{}
		employeeIdType := sql.NullInt64{}
		parentTaskType := sql.NullInt64{}
		worktimeType := sql.NullInt64{}
		err := rows.Scan(&c.Id, &c.ProjectId, &employeeIdType, &c.AuthorId, &parentTaskType, &c.CreateDate, &c.FinishDate, &c.Priority, &worktimeType, &c.State, &c.Name, &c.Description)
		if employeeIdType.Valid {
			c.EmployeeId = int(employeeIdType.Int64)
		} else {
			c.EmployeeId = 0
		}
		if parentTaskType.Valid {
			c.ParentTask = int(parentTaskType.Int64)
		} else {
			c.ParentTask = 0
		}
		if worktimeType.Valid {
			c.Worktime = int(worktimeType.Int64)
		} else {
			c.Worktime = 0
		}
		if err != nil {
			return tasks, err
		}
		tasks = append(tasks, &c)
	}
	if err = rows.Err(); err != nil {
		log.Println(err)
	}

	return tasks, err
}