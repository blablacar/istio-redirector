package istio

import (
	"bytes"
	"io/ioutil"
	"testing"
)

func TestValidate(t *testing.T) {
	path := "../../../mocks/virtual-services/example.yaml"
	payload, err := ioutil.ReadFile(path)
	if err != nil {
		t.Errorf("can't read file: %v", err)
	}

	_, err = Validate(bytes.NewBuffer(payload))

	if err != nil {
		t.Errorf("can't validate file as VirtualService: %v", err)
	}
}
