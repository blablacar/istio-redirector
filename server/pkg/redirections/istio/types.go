package istio

import (
	"istio-redirector/domain"
)

type Config struct {
	Istio Istio
}

type Istio struct {
	DestinationRule        string
	Namespace              string
	DefaultDestinationHost string
	FallbackMatchingRegex  string
	Gateways               []string
	ExportTo               []string
}

type Redirections struct {
	Name                            string
	Namespace                       string
	DestinationRuleName             string
	DefaultDestinationHost          string
	DefaultMatchingRegexDestination string
	Hosts                           []string
	Gateways                        []string
	ExportTo                        []string
	Rules                           []domain.Rule
}
