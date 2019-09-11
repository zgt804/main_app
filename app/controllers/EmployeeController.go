package controllers

import (
	"github.com/revel/revel"
	"my-app/app/providers"
	"my-app/app/routes"
	"my-app/app/structures"
)

// EmployeeController
type EmployeeController struct {
	*revel.Controller
}


// проверка существования авторизованного пользователя
func (c *EmployeeController) Connected() revel.Result {
	user, err := c.Session.Get("user")
	if err != nil {
		return nil
	}
	if user != nil {
		return c.RenderJSON(user)
	}
	return nil
}

func (c *EmployeeController) GetAll() revel.Result {
	if c.Connected() == nil {
		return c.Redirect(routes.App.Auth())
	}
	employees, err := providers.EmployeeGetAll()
	if err != nil{
		return c.RenderError(err)
	}
	return c.RenderJSON(employees)
}

func (c *EmployeeController) Login(user structures.User) revel.Result {
	users, err := providers.UserLogin(user)
	if err != nil {
		c.RenderError(err)
	}
	if users != nil {
		c.Session["user"] = users[0]
	}
	return c.RenderJSON(c.Session["user"])
}

func (c *EmployeeController) Logout() revel.Result {
	c.Session.Del("user")
	return c.RenderText("Выполнен выход")
}

// возвращает данные авторизованного пользователя
func (c *EmployeeController) GetUser() revel.Result {
	user, err := c.Session.Get("user")
	if err != nil {
		return nil
	}
	if user != nil {
		return c.RenderJSON(user)
	}
	return nil
}