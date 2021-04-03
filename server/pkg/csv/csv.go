package csv

import (
	"encoding/csv"
	"mime/multipart"

	"github.com/n0rad/go-erlog/logs"
)

func ReadFile(file multipart.File) [][]string {
	records, err := csv.NewReader(file).ReadAll()
	if err != nil {
		logs.Error("unable to parse file as CSV")
	}

	return records
}
