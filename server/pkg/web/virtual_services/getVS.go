package virtual_services

import (
	"encoding/json"
	"istio-redirector/pkg/k8s"
	"net/http"

	log "github.com/sirupsen/logrus"
)

func GetVSHandler(w http.ResponseWriter, r *http.Request) {

	ic, err := k8s.Setup()
	if err != nil {
		log.Error(err.Error())
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}

	vsList, err := k8s.GetVS(*ic)
	if err != nil {
		log.Error(err.Error())
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(vsList.Items)
}
