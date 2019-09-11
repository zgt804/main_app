package controllers

import (
	"github.com/revel/revel"
	"my-app/app/providers"
	"my-app/app/routes"
	"my-app/app/structures"
)

// ProjectController
type ProjectController struct {
	*revel.Controller
}


// проверка существования авторизованного пользователя
func (c *ProjectController) Connected() revel.Result {
	user, err := c.Session.Get("user")
	if err != nil {
		return nil
	}
	if user != nil {
		return c.RenderJSON(user)
	}
	return nil
}

func (c *ProjectController) GetAll() revel.Result {
	if c.Connected() == nil {
		return c.Redirect(routes.App.Auth())
	}
	projects, err := providers.ProjectGetAll()
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(projects)
}

func (c *ProjectController) Create(project structures.Project) revel.Result {
	if c.Connected() == nil {
		return c.Redirect(routes.App.Auth())
	}
	projects, err := providers.ProjectCreate(project)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(projects)
}

func (c *ProjectController) Delete(id int) revel.Result {
	if c.Connected() == nil {
		return c.Redirect(routes.App.Auth())
	}
	id, err := providers.ProjectDelete(id)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(id)
}

func (c *ProjectController) Update(project structures.Project) revel.Result {
	if c.Connected() == nil {
		return c.Redirect(routes.App.Auth())
	}
	projects, err := providers.ProjectUpdate(project)
	if err != nil {
		return c.RenderError(err)
	}
	return c.RenderJSON(projects)
}