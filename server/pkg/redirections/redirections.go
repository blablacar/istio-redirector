package redirections

import (
	"bytes"
	"io/ioutil"
	"istio-redirector/domain"
	"istio-redirector/pkg/csv"
	"istio-redirector/pkg/metrics"
	"istio-redirector/pkg/redirections/istio"
	"strconv"
	"text/template"

	"github.com/n0rad/go-erlog/logs"
	"github.com/spf13/viper"
)

func Generate(inputData domain.InputData) (bytes.Buffer, error) {
	const redirectionType string = "istio"

	var istioConfig istio.Config
	err := viper.Unmarshal(&istioConfig)
	if err != nil {
		logs.WithE(err).Info("unable to decode into struct")
	}

	r := istio.Redirections{
		Name:                inputData.RedirectionName,
		Namespace:           istioConfig.Istio.VirtualServiceNamespace,
		DestinationRuleName: istioConfig.Istio.DestinationRule,
		Hosts:               istioConfig.Istio.VirtualServiceHosts,
	}

	byteContainer, err := ioutil.ReadAll(inputData.File)
	rulesCSV := csv.ReadFile(byteContainer)
	for _, rule := range rulesCSV {
		var data domain.Rule
		if inputData.RedirectionType == "3xx" {
			code, err := strconv.Atoi(rule[2])
			if err != nil {
				logs.WithE(err).Error("fail to parse line")
				break
			}
			data = domain.Rule{
				From: rule[0],
				To:   rule[1],
				Code: code,
			}
		} else {
			code, _ := strconv.Atoi(rule[1])
			data = domain.Rule{
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
