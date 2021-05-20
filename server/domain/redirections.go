package domain

type InputData struct {
	File                 []byte
	RedirectionName      string
	RedirectionEnv       string
	RedirectionNamespace string
	RedirectionType      string
	FallbackValueRegex   string
	DestinationHost      string
}

type Rule struct {
	Name string
	From string
	To   string
	Code int
}
