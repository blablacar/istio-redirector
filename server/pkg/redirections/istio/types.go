package istio

import (
	"istio-redirector/domain"
)

type Config struct {
	Istio Istio
}

type Istio struct {
	DestinationRule string
	Namespace       string
	Gateways        []string
}

type Redirections struct {
	Name            string
	Namespace       string
	ClusterName     string
	DestinationHost string
	Hosts           []string
	Gateways        []string
	Rules           []domain.Rule
}
