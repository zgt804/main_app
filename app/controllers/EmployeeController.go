package controllers

import (
	"github.com/revel/revel"
	"my-app/app/providers"
)

// EmployeeController
type EmployeeController struct {
	*revel.Controller
}

func (c *EmployeeController) GetAll() revel.Result {
	employees, err := providers.EmployeeGetAll()
	if err != nil{
		return c.RenderError(err)
	}
	return c.RenderJSON(employees)
}