package controllers

import (
	"github.com/revel/revel"
	"my-app/app/providers"
	"my-app/app/structures"
)

// ProjectController
type ProjectController struct {
	*revel.Controller
}

func (c *ProjectController) GetAll() revel.Result {
	projects, err := providers.ProjectGetAll()
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(projects)
}

func (c *ProjectController) Create(project structures.Project) revel.Result {
	projects, err := providers.ProjectCreate(project)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(projects)
}

func (c *ProjectController) Delete(id int) revel.Result {
	id, err := providers.ProjectDelete(id)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(id)
}

func (c *ProjectController) Update(project structures.Project) revel.Result {
	projects, err := providers.ProjectUpdate(project)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(projects)
}