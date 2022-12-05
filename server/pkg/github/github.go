package github

import (
	"context"
	"fmt"
	"istio-redirector/domain"

	"github.com/google/go-github/v35/github"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
)

func Create(fileContent []byte, prName string, gitPath string) (string, error) {
	var gitHubConfig domain.GithubConfig
	// Set the file name of the configurations file
	viper.SetConfigName("config")
	// Set the path to look for the configurations file
	viper.AddConfigPath(".")
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		log.WithError(err).Info("can't read config.yaml")
	}

	err := viper.Unmarshal(&gitHubConfig)
	if err != nil {
		log.WithError(err).Info("unable to decode into struct")
	}

	ctx := context.Background()

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: gitHubConfig.Github.Token},
	)
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	// Get main branch as reference
	baseRef, _, err := client.Git.GetRef(ctx, gitHubConfig.Github.Owner, gitHubConfig.Github.Repo, "refs/heads/"+gitHubConfig.Github.BaseRef)
	if err != nil {
		log.Errorf("Git.GetRef returned error: %v", err)
		return "", err
	}
	log.Debugf("%v", baseRef)

	newBranchName := gitHubConfig.Github.NewBranchPrefix + "/" + prName
	log.Debugf("%v", newBranchName)
	// Create new branch from main
	newRef := &github.Reference{Ref: github.String("refs/heads/" + newBranchName), Object: &github.GitObject{SHA: baseRef.Object.SHA}}
	log.Debugf("%v", newRef)
	ref, _, err := client.Git.CreateRef(ctx, gitHubConfig.Github.Owner, gitHubConfig.Github.Repo, newRef)
	if err != nil {
		log.Errorf("Git.CreateRef returned error: %v", err)
	}
	log.Infof("%v", ref.GetURL())

	// Add new content to new branch
	opts := &github.RepositoryContentFileOptions{
		Message:   github.String("[istio-redirector] New redirections"),
		Content:   fileContent,
		Branch:    newRef.Ref,
		Committer: &github.CommitAuthor{Name: github.String("istio-redirector Bot"), Email: github.String(gitHubConfig.Github.Email)},
	}
	_, _, errCreateFile := client.Repositories.CreateFile(ctx, gitHubConfig.Github.Owner, gitHubConfig.Github.Repo, gitPath+"/"+prName+"-vs.yaml", opts)
	if errCreateFile != nil {
		fmt.Println(errCreateFile)
		return "", errCreateFile
	}

	// Create PR from new branch to main
	newPR := &github.NewPullRequest{
		Title:               github.String("[istio-redirector][bot] " + prName),
		Head:                opts.Branch,
		Base:                github.String(gitHubConfig.Github.BaseRef),
		Body:                github.String("New content from istio-redirector"),
		MaintainerCanModify: github.Bool(true),
	}
	prRes, _, errCreatePr := client.PullRequests.Create(ctx, gitHubConfig.Github.Owner, gitHubConfig.Github.Repo, newPR)
	if errCreatePr != nil {
		log.Errorf("PullRequests.Create returned error: %v", errCreatePr)
	}

	return prRes.GetHTMLURL(), err
}
