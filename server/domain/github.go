package domain

type GithubConfig struct {
	Github Github
}

type Github struct {
	Token string
	Repo string
	Owner string
	Branch string
}
