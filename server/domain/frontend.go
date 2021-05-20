package domain

type FrontendConfig struct {
	FrontendConfig FrontendData
}

type FrontendData struct {
	AvailableNamespace      []string
	AvailableCluster        []string
	AvailableDestinationSvc []string
	EnableGitHub            bool
}
