/*
 * @Author: Innei
 * @Date: 2020-07-11 14:57:04
 * @LastEditTime: 2020-07-12 19:50:19
 * @LastEditors: Innei
 * @FilePath: /iris-graph/model/todo.go
 * @Coding with Love
 */
package model

import (
	"github.com/thanhpk/randstr"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Todo struct {
	Id      primitive.ObjectID `bson:"_id" json:"_id"`
	Title   string             `bson:"title" json:"title"`
	Content string             `bson:"content" json:"content"`
}

func (T *Todo) Generate() Todo {

	var token interface{} = randstr.Hex(16)
	title := randstr.String(8)
	content := randstr.String(80)
	t := Todo{Id: token.(primitive.ObjectID), Title: title, Content: content}

	return t
}
