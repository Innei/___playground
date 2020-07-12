/*
 * @Author: Innei
 * @Date: 2020-07-11 15:08:16
 * @LastEditTime: 2020-07-12 21:16:23
 * @LastEditors: Innei
 * @FilePath: /iris-graph/controller/todo/todo.go
 * @Coding with Love
 */
package todo

import (
	"iris-graph/model"
	service "iris-graph/service/todo"
	"iris-graph/utils"

	"github.com/kataras/iris/v12"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func All(ctx iris.Context) {
	query := ctx.Request().URL.Query()
	var page interface{} = query.Get("page")
	if page == "" {
		page = 1
	} else {
		page = utils.ParseInt(page.(string))
		if page.(int64) < 1 {
			page = int64(1)
		}
	}
	data := service.FindMany(bson.M{}, service.FindManyOptions{Page: page.(int64)})
	ctx.JSON(data)
}

func Top(ctx iris.Context) {
	var model = model.Todo{}
	service.FindOne(bson.D{}).Decode(&model)
	ctx.JSON(model)
}

func Create(ctx iris.Context) {
	var model model.Todo = model.Todo{Id: primitive.NewObjectID()}
	ctx.ReadJSON(&model)

	res := service.Add(model)
	ctx.JSON(res)
}

func FindById(ctx iris.Context) {
	id := ctx.Params().Get("id")

	res := service.FindOne(bson.M{"id": utils.ParseInt(id)})

	model := model.Todo{}
	res.Decode(&model)
	ctx.JSON(model)
}

func DeleteById(ctx iris.Context) {
	id := ctx.Params().Get("id")

	res := service.DeleteOne(bson.M{"id": utils.ParseInt(id)})
	ctx.JSON(res)
}
