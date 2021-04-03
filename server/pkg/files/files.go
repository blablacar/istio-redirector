package files

import (
	"io/ioutil"

	"istio-redirector/types"
	"os"

	"gopkg.in/yaml.v2"
)

func WriteContentToFile(payload []byte, name string) error {
	err := ioutil.WriteFile(name, payload, 0644)
	if err != nil {
		return err
	}
	return nil
}

func ReadConfigFile() (cfg types.Config, err error) {
	var config types.Config
	f, err := os.Open("config.yaml")
	if err != nil {
		return config, err
	}
	defer f.Close()

	decoder := yaml.NewDecoder(f)
	err = decoder.Decode(&config)
	if err != nil {
		return config, err
	}

	return config, nil
}
