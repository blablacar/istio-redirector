package istio

import (
	"bytes"
	"encoding/json"
	"fmt"

	v1beta1 "istio.io/client-go/pkg/apis/networking/v1beta1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/yaml"
)

func Validate(payload *bytes.Buffer) (*v1beta1.VirtualService, error) {
	virtualService := &v1beta1.VirtualService{}

	// we need to transform yaml to json so the marshaler from istio works
	jsonBytes, err := yaml.YAMLToJSON(payload.Bytes())
	if err != nil {
		return virtualService, err
	}

	meta := &v1.TypeMeta{}
	if err = json.Unmarshal(jsonBytes, meta); err != nil {
		return virtualService, fmt.Errorf("error extracting the metadata of the virtualservice")
	}

	if meta.Kind != "VirtualService" {
		return virtualService, fmt.Errorf("file is not kind VirtualService")
	}

	if err = json.Unmarshal(jsonBytes, virtualService); err != nil {
		return virtualService, err
	}

	if len(virtualService.Spec.Http) > 5000 {
		return virtualService, fmt.Errorf("file is too big for Kubernetes. You should add less redirections at once, current is %v", virtualService.Spec.Http)
	}

	return virtualService, nil
}
