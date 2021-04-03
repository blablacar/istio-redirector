package redirections

import (
	"bytes"
	"html/template"
	"istio-redirector/pkg/csv"
	"istio-redirector/pkg/files"
	"istio-redirector/pkg/metrics"
	"mime/multipart"
	"strconv"

	"github.com/n0rad/go-erlog/logs"
)

type InputData struct {
	File            multipart.File
	RedirectionName string
}

type Rule struct {
	Name string
	From string
	To   string
	Code int
}

type Redirections struct {
	Name                string
	Namespace           string
	DestinationRuleName string
	Hosts               []string
	Rules               []Rule
}

func Generate(inputData InputData) error {
	r := Redirections{
		Name:                inputData.RedirectionName,
		Namespace:           "infra",
		DestinationRuleName: "http-echo.infra.svc.cluster.local",
		Hosts: []string{
			"domain.example",
		},
	}

	rulesCSV := csv.ReadFile(inputData.File)
	for _, rule := range rulesCSV {
		var data Rule
		if len(rule) > 2 {
			code, err := strconv.Atoi(rule[2])
			if err != nil {
				logs.WithE(err).Error("fail to parse line")
				break
			}
			data = Rule{
				From: rule[0],
				To:   rule[1],
				Code: code,
			}
		} else {
			code, _ := strconv.Atoi(rule[1])
			data = Rule{
				From: rule[0],
				Code: code,
			}
		}

		r.Rules = append(r.Rules, data)
	}

	var payload bytes.Buffer
	t, err := template.ParseFiles("templates/virtual-service.yaml")
	if err != nil {
		logs.WithE(err).Error("fail to parse template")
		return err
	}

	err = t.Execute(&payload, r)
	if err != nil {
		logs.WithE(err).Error("fail to execute content to template")
		return err
	}

	err = files.WriteContentToFile(payload.Bytes(), "generated/virtual-service.yaml")
	if err != nil {
		logs.WithE(err).Error("fail to write content to file")
		return err
	}

	metrics.CSVFileImported.Inc()

	return nil
}
