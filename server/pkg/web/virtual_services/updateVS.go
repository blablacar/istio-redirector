package virtual_services

import (
	"bytes"
	"encoding/json"
	"html/template"
	"istio-redirector/pkg/github"
	"istio-redirector/pkg/redirections/istio"
	"net/http"

	"github.com/gorilla/schema"
	"github.com/n0rad/go-erlog/logs"
	"istio.io/client-go/pkg/apis/networking/v1beta1"
)

var decoder = schema.NewDecoder()

func UpdateVSHandler(w http.ResponseWriter, r *http.Request) {

	var vs v1beta1.VirtualService
	var payload bytes.Buffer

	err := json.NewDecoder(r.Body).Decode(&vs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	t, err := template.ParseFiles("templates/virtual-service-edit.yaml")
	if err != nil {
		logs.WithE(err).Error("fail to parse template")
	}
	err = t.Execute(&payload, vs)
	if err != nil {
		logs.WithE(err).Error("fail to execute content to template")
	}

	_, err = istio.Validate(&payload)
	if err != nil {
		logs.WithE(err).Error("fail to validate template as VirtualService")
	}

	prURL, err := github.Create(payload.Bytes(), vs.Name, vs.Labels["cluster_name"]+"/"+vs.Namespace)

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"PR": prURL, "error": err.Error()})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"PR": prURL})
}
