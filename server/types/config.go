package types

type Config struct {
	ServerURL               string   `yaml:"serverURL"`
	AllowedOrigins          []string `yaml:"allowedOrigins"`
	DestinationRule         string   `yaml:"destinationRule"`
	VirtualServiceNamespace string   `yaml:"virtualServiceNamespace"`
	VirtualServiceHosts     []string `yaml:"virtualServiceHosts"`
}
