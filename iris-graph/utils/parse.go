/*
 * @Author: Innei
 * @Date: 2020-07-12 20:28:04
 * @LastEditTime: 2020-07-12 20:30:32
 * @LastEditors: Innei
 * @FilePath: /iris-graph/utils/parse.go
 * @Coding with Love
 */
package utils

import (
	"log"
	"strconv"
)

func ParseInt(s string) int64 {
	if id, err := strconv.ParseInt(s, 10, 64); err != nil {
		log.Fatal(err)
		panic(err)
	} else {
		return id
	}
}
