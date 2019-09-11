package controllers

import (
	"github.com/revel/revel"
	"my-app/app/routes"
)

type App struct {
	*revel.Controller
}

// проверка существования авторизованного пользователя
func (c *App) Connected() revel.Result {
	user, err := c.Session.Get("user")
	if err != nil {
		return nil
	}
	if user != nil {
		return c.RenderJSON(user)
	}
	return nil
}

// страница проекта
func (c *App) Index() revel.Result {
	if c.Connected() == nil {
		return c.Redirect(routes.App.Auth())
	}
	return c.Render()
}

// страница авторизации
func (c *App) Auth() revel.Result {
	if c.Connected() != nil {
		return c.Redirect(routes.App.Index())
	}
	return c.Render()
}