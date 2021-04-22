package domain

type GithubConfig struct {
	Github Github
}

type Github struct {
	Token           string
	Email           string
	Repo            string
	Owner           string
	BaseRef         string
	NewBranchPrefix string
}
