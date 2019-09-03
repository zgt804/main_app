package controllers

import (
	"github.com/revel/revel"
	"my-app/app/providers"
	"my-app/app/structures"
)

//функция построения дерева задач
func addChildTree(task []*structures.Task, array []*structures.Task, id int) {
	for i := 0; i < len(task); i++ {
		if(task[i].ParentTask == id) {
			array[len(array)-1].Open = true
			array[len(array)-1].Data = append(array[len(array)-1].Data, task[i])
			addChildTree(task, array[len(array)-1].Data, task[i].Id)
		}
	}
}

// TaskController
type TaskController struct {
	*revel.Controller
}

func (c *TaskController) GetAll() revel.Result {
	tasks, err := providers.TaskGetAll()
	if err != nil{
		return c.RenderError(err)
	}
	return c.RenderJSON(tasks)
}

func (c *TaskController) GetForProject(id structures.TaskTree) revel.Result {
	tasks, err := providers.GetTaskForProject(id)
	if err != nil{
		return c.RenderError(err)
	}

	var newTreeBuilder []*structures.Task
	for i := 0; i < len(tasks); i++ {

		if(tasks[i].ParentTask == 0) {
			newTreeBuilder = append(newTreeBuilder, tasks[i])
			addChildTree(tasks, newTreeBuilder, tasks[i].Id)
		}
	}
	return c.RenderJSON(newTreeBuilder)
}

func (c *TaskController) Create(task structures.Task) revel.Result {
	tasks, err := providers.TaskCreate(task)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(tasks)
}

func (c *TaskController) Update(task structures.Task) revel.Result {
	tasks, err := providers.TaskUpdate(task)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(tasks)
}