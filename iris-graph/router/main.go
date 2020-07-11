/*
 * @Author: Innei
 * @Date: 2020-07-11 15:01:46
 * @LastEditTime: 2020-07-11 15:01:47
 * @LastEditors: Innei
 * @FilePath: /iris-graph/routers/main.go
 * @Coding with Love
 */
package router

import "github.com/kataras/iris/v12"

func RegisterRouters(app *iris.Application) {
	todo := app.Party("/todo")
	TodoRoutes(todo)

}
