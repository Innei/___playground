/*
 * @Author: Innei
 * @Date: 2020-07-11 15:08:16
 * @LastEditTime: 2020-07-11 16:56:09
 * @LastEditors: Innei
 * @FilePath: /iris-graph/controller/todo/todo.go
 * @Coding with Love
 */
package todo

import (
	"iris-graph/model"
	service "iris-graph/service/todo"

	"github.com/kataras/iris/v12"
	"go.mongodb.org/mongo-driver/bson"
)

func Add(ctx iris.Context) {
	model := model.Todo{}
	res := service.Add(model.Generate())
	ctx.JSON(res)
}

func Top(ctx iris.Context) {
	var model = model.Todo{}
	service.Find(bson.D{}).Decode(&model)
	ctx.JSON(model)
}
