package web

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"istio-redirector/domain"
	"istio-redirector/pkg/github"
	"istio-redirector/pkg/redirections"
	"net/http"
	"strconv"
	"strings"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func UploadCSVHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20)
	file, _, err := r.FormFile("csv_file")
	if err != nil {
		log.WithError(err).Error("can't get csv file from form")
		return
	}
	defer file.Close()

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
		return
	}

	payload, err := redirections.Generate(
		domain.InputData{
			File:                 buf.Bytes(),
			RedirectionName:      r.FormValue("redirectionName"),
			RedirectionEnv:       r.FormValue("redirectionEnv"),
			RedirectionNamespace: r.FormValue("redirectionNamespace"),
			RedirectionType:      r.FormValue("redirectionType"),
			FallbackValueRegex:   r.FormValue("fallbackValue"),
			DestinationHost:      r.FormValue("destinationHost"),
			SourceHosts:          strings.Split(r.FormValue("sourceHosts"), ";"),
		},
	)

	if err != nil {
		log.Error(err.Error())
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}
	log.WithFields(log.Fields{
		"name":      r.FormValue("redirectionName"),
		"namespace": r.FormValue("redirectionNamespace"),
		"kube-env":  r.FormValue("redirectionEnv"),
	}).Info("VirtualService has been generated")

	pushGithub, err := strconv.ParseBool(r.FormValue("pushGithub"))
	if err != nil {
		log.Error(err.Error())
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}
	if pushGithub {
		prURL, err := github.Create(payload.Bytes(), r.FormValue("redirectionName"), r.FormValue("redirectionEnv")+"/"+r.FormValue("redirectionNamespace"))
		w.Header().Set("Content-Type", "application/json")
		if err != nil {
			log.Error(err.Error())
			w.WriteHeader(400)
			json.NewEncoder(w).Encode(map[string]string{"PR": prURL, "error": err.Error()})
		}
		json.NewEncoder(w).Encode(map[string]string{"PR": prURL})
		return
	}

	//copy the relevant headers. If you want to preserve the downloaded file name, extract it with go's url parser.
	w.Header().Set("Content-Disposition", "attachment; filename=virtual-service.yaml")
	w.Header().Set("Content-Type", r.Header.Get("Content-Type"))
	w.Header().Set("Content-Length", fmt.Sprintf("%d", payload.Len()))

	//stream the body to the client without fully loading it into memory
	io.Copy(w, &payload)
}

func GetConfigHandler(w http.ResponseWriter, r *http.Request) {
	var frontendConfig domain.FrontendConfig
	err := viper.Unmarshal(&frontendConfig)
	if err != nil {
		log.WithError(err).Error("unable to decode into struct")
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(frontendConfig.FrontendConfig)
}
