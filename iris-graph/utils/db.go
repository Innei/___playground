/*
 * @Author: Innei
 * @Date: 2020-07-11 15:43:14
 * @LastEditTime: 2020-07-11 16:16:02
 * @LastEditors: Innei
 * @FilePath: /iris-graph/utils/db.go
 * @Coding with Love
 */
package utils

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

var Db *mongo.Database
var Ctx context.Context

func InitDb() (*mongo.Client, error) {

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// defer cancel()
	err = client.Connect(ctx)
	Db = client.Database("todo")
	return client, err
}
