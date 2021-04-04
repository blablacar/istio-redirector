package domain

import "mime/multipart"

type InputData struct {
	File            multipart.File
	RedirectionName string
	RedirectionType string
}

type Rule struct {
	Name string
	From string
	To   string
	Code int
}
