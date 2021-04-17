package github

import (
	"context"
	"fmt"
	"istio-redirector/domain"

	"github.com/google/go-github/v35/github"
	"github.com/n0rad/go-erlog/logs"
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
)

func Create() {
	var gitHubConfig domain.GithubConfig
	// Set the file name of the configurations file
	viper.SetConfigName("config")
	// Set the path to look for the configurations file
	viper.AddConfigPath(".")
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		logs.WithE(err).Info("can't read config.yaml")
	}

	err := viper.Unmarshal(&gitHubConfig)
	if err != nil {
		logs.WithE(err).Info("unable to decode into struct")
	}

	ctx := context.Background()

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: config.Github.Token},
	)
	logs.Info(config.Github.Token)
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	// Get main branch as reference
	baseRef, _, err := client.Git.GetRef(ctx, config.Github.Owner, config.Github.Repo, "refs/heads/main")
	if err != nil {
		logs.Errorf("Git.GetRef returned error: %v", err)
	}
	logs.Infof("%v", baseRef)

  // Create new branch from main
	newRef := &github.Reference{Ref: github.String("refs/heads/"+config.Github.Branch), Object: &github.GitObject{SHA: baseRef.Object.SHA}}
	ref, _, err := client.Git.CreateRef(ctx, config.Github.Owner, config.Github.Repo, newRef)
	if err != nil {
		logs.Errorf("Git.CreateRef returned error: %v", err)
	}
	logs.Info("%v", ref.GetURL())

  // Add new content to new branch
	fileContent := []byte("This is the content of my file\nand the 2nd line of it")
	opts := &github.RepositoryContentFileOptions{
		Message:   github.String("This is my commit message"),
		Content:   fileContent,
		Branch:    github.String(config.Github.Branch),
		Committer: &github.CommitAuthor{Name: github.String("istio-redirector Bot"), Email: github.String("etienne.fontaine1@gmail.com")},
	}
	_, _, errCreateFile := client.Repositories.CreateFile(ctx, config.Github.Owner, config.Github.Repo, "test-from-code-2.yaml", opts)
	if errCreateFile != nil {
		fmt.Println(errCreateFile)
		return
	}

	// Create PR from new branch to main
	newPR := &github.NewPullRequest{
		Title:               github.String("new test from code"),
		Head:                github.String(config.Github.Branch),
		Base:                github.String("main"),
		Body:                github.String("New content for istio-redirection"),
		MaintainerCanModify: github.Bool(true),
	}
	_, _, errCreatePr := client.PullRequests.Create(ctx, config.Github.Owner, config.Github.Repo, newPR)
	if errCreatePr != nil {
		logs.Errorf("PullRequests.Create returned error: %v", errCreatePr)
	}
}
