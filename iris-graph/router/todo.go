/*
 * @Author: Innei
 * @Date: 2020-07-11 15:02:17
 * @LastEditTime: 2020-07-12 21:18:52
 * @LastEditors: Innei
 * @FilePath: /iris-graph/router/todo.go
 * @Coding with Love
 */
package router

import (
	"iris-graph/controller/todo"

	"github.com/kataras/iris/v12"
)

func TodoRoutes(p iris.Party) {

	p.Get("/", todo.All)
	p.Get("/top", todo.Top)
	p.Get("/:id", todo.FindById)
	p.Post("/", todo.Create)
	p.Delete("/:id", todo.DeleteById)

}
