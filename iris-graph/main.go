/*
 * @Author: Innei
 * @Date: 2020-07-11 14:44:06
 * @LastEditTime: 2020-07-11 16:49:22
 * @LastEditors: Innei
 * @FilePath: /iris-graph/main.go
 * @Coding with Love
 */
package main

import (
	"iris-graph/router"
	"iris-graph/utils"
	"log"

	"github.com/kataras/iris/v12"
)

func main() {

	if _, err := utils.InitDb(); err != nil {
		log.Fatal(err)
	}
	app := iris.New()

	app.Get("/", index)
	router.RegisterRouters(app)
	app.Listen(":8080")
}

func index(ctx iris.Context) {
	ctx.JSON(iris.Map{
		"ping": "pong",
	})

}
