package istio

import (
	"istio-redirector/domain"
)

type Config struct {
	Istio Istio
}

type Istio struct {
	DestinationRule         string
	VirtualServiceNamespace string
	VirtualServiceHosts     []string
}

type Redirections struct {
	Name                string
	Namespace           string
	DestinationRuleName string
	Hosts               []string
	Rules               []domain.Rule
}
