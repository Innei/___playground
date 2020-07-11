/*
 * @Author: Innei
 * @Date: 2020-07-11 16:39:06
 * @LastEditTime: 2020-07-11 16:39:17
 * @LastEditors: Innei
 * @FilePath: /iris-graph/utils/case.go
 * @Coding with Love
 */
package utils

import (
	"reflect"
	"strings"
	"unicode/utf8"
)

// SnakeCaseEncode snake_case's the given struct's field names.
func SnakeCaseEncode(i interface{}) map[string]interface{} {
	rt, rv := reflect.TypeOf(i), reflect.ValueOf(i)

	if rt.Kind() == reflect.Ptr {
		i := reflect.Indirect(rv).Interface()
		rt, rv = reflect.TypeOf(i), reflect.ValueOf(i)
	}

	out := make(map[string]interface{}, rt.NumField())

	for i := 0; i < rt.NumField(); i++ {
		if strings.Contains(rt.Field(i).Tag.Get("json"), "omitempty") {
			continue
		}

		k := snakeCase(rt.Field(i).Name)

		out[k] = rv.Field(i).Interface()
	}

	return out
}

// snakeCase provides basic ASCII conversion of camelCase field names to snake_case.
func snakeCase(s string) string {
	out := make([]rune, 0, utf8.RuneCountInString(s))

	for i, r := range s {
		if r >= 'A' && r <= 'Z' {
			r += 32

			if i > 0 {
				out = append(out, '_')
			}
		}

		out = append(out, r)
	}

	return string(out)
}
