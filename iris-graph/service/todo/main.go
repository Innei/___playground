/*
 * @Author: Innei
 * @Date: 2020-07-11 15:56:18
 * @LastEditTime: 2020-07-11 17:03:33
 * @LastEditors: Innei
 * @FilePath: /iris-graph/service/todo/main.go
 * @Coding with Love
 */
package todo

import (
	"iris-graph/model"
	"iris-graph/utils"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Filter struct {
	Id    string
	Title string
}

var collection *mongo.Collection

func getCollection() *mongo.Collection {
	if collection != nil {
		return collection
	}
	collection = utils.Db.Collection("todo")
	return collection
}
func Add(model model.Todo) *mongo.InsertOneResult {
	res, err := getCollection().InsertOne(utils.Ctx, bson.M{
		"title":   model.Title,
		"content": model.Content,
	})
	if err != nil {
		log.Fatal(err)
	}
	return res
}

func Find(f interface{}) *mongo.SingleResult {
	res := getCollection().FindOne(utils.Ctx, f)

	return res
}
