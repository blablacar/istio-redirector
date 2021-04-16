package domain

type InputData struct {
	File            []byte
	RedirectionName string
	RedirectionType string
}

type Rule struct {
	Name string
	From string
	To   string
	Code int
}
