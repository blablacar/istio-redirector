package csv

import (
	"io/ioutil"
	"testing"
)

func TestReadFile(t *testing.T) {

	path := "../../mocks/status_301.csv"
	data, err := ioutil.ReadFile(path)
	if err != nil {
		t.Errorf("can't read file: %v", path)
		return
	}

	rulesCSV := ReadFile(data)
	if rulesCSV[0][0] != "https://www.domain.example/a" {
		t.Errorf("content file is wrong, got %v, expected https://www.domain.example/a", rulesCSV[0][0])
		return
	}
}
