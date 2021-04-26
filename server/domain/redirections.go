package domain

type InputData struct {
	File            []byte
	RedirectionName string
	RedirectionNamespace string
	RedirectionType string
	EnableFallback bool
}

type Rule struct {
	Name string
	From string
	To   string
	Code int
}
