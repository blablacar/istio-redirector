package csv

import (
	"bytes"
	"encoding/csv"

	"github.com/n0rad/go-erlog/logs"
)

func ReadFile(file []byte) [][]string {
	records, err := csv.NewReader(bytes.NewBuffer(file)).ReadAll()
	if err != nil {
		logs.Error("unable to parse file as CSV")
	}

	return records
}
