/*
 * @Author: Innei
 * @Date: 2020-07-11 15:56:18
 * @LastEditTime: 2020-07-12 21:27:46
 * @LastEditors: Innei
 * @FilePath: /iris-graph/service/todo/main.go
 * @Coding with Love
 */
package todo

import (
	"context"
	"iris-graph/model"
	"iris-graph/utils"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type index struct {
	Id int64 `bson:"id`
}
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
	col := getCollection()
	// count, err := col.CountDocuments(utils.Ctx, bson.M{})
	latest := col.FindOne(utils.Ctx, bson.M{}, options.FindOne().SetSort(bson.D{{"_id", -1}}))
	var latestDoc index
	latest.Decode(&latestDoc)

	res, err := col.InsertOne(utils.Ctx, bson.M{
		"title":   model.Title,
		"content": model.Content,
		"id":      latestDoc.Id + 1,
	})
	if err != nil {
		log.Fatal(err)
	}
	return res
}

func FindOne(f interface{}) *mongo.SingleResult {
	res := getCollection().FindOne(utils.Ctx, f)

	return res
}

type FindManyOptions struct {
	Page int64
}

func FindMany(f interface{}, option ...FindManyOptions) []model.Todo {
	page := option[0].Page

	limit := int64(5)
	skip := limit * (page - 1)
	if cur, err := getCollection().Find(utils.Ctx, f, &options.FindOptions{Limit: &limit, Skip: &skip}); err != nil {
		log.Fatal(err)
		panic(err)
	} else {
		var model []model.Todo
		if err := cur.All(utils.Ctx, &model); err != nil {
			log.Fatal(err)
		}
		return model
	}
}

func DeleteOne(f interface{}) *mongo.DeleteResult {
	res, err := getCollection().DeleteOne(context.Background(), f)
	if err != nil {
		log.Fatal(err)
	}
	return res
}
