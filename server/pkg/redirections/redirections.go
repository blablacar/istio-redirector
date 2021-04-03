package redirections

import (
	"bytes"
	"html/template"
	"istio-redirector/pkg/csv"
	"istio-redirector/pkg/files"
	"istio-redirector/pkg/metrics"
	"mime/multipart"
	"os"
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

func Generate(inputData InputData) (bytes.Buffer, error) {
	cfg, err := files.ReadConfigFile()
	if err != nil {
		logs.WithE(err).Error("can't load config file")
		os.Exit(1)
	}

	r := Redirections{
		Name:                inputData.RedirectionName,
		Namespace:           cfg.VirtualServiceNamespace,
		DestinationRuleName: cfg.DestinationRule,
		Hosts:               cfg.VirtualServiceHosts,
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
		return payload, err
	}

	err = t.Execute(&payload, r)
	if err != nil {
		logs.WithE(err).Error("fail to execute content to template")
		return payload, err
	}

	metrics.CSVFileImported.Inc()

	return payload, nil
}
