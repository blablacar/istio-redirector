package main

import (
	"istio-redirector/cmd"

	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetFormatter(&log.JSONFormatter{})
	cmd.ExecuteCmd()
}
