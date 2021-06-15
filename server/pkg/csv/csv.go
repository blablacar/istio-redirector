package csv

import (
	"bytes"
	"encoding/csv"

	log "github.com/sirupsen/logrus"
)

func ReadFile(file []byte) [][]string {
	records, err := csv.NewReader(bytes.NewBuffer(file)).ReadAll()
	if err != nil {
		log.Error("unable to parse file as CSV")
	}

	return records
}
