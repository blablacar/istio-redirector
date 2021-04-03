package files

import (
	"io/ioutil"
)

func WriteContentToFile(payload []byte, name string) error {
	err := ioutil.WriteFile(name, payload, 0644)
	if err != nil {
		return err
	}
	return nil
}
