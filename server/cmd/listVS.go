package cmd

import (
	"encoding/json"
	"fmt"
	"istio-redirector/pkg/k8s"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(istioListVSCmd)
}

var istioListVSCmd = &cobra.Command{
	Use:   "list-vs",
	Short: "Get all Virtual Services from your cluster created with istio-redirector",
	RunE: func(cmd *cobra.Command, args []string) error {

		ic, err := k8s.Setup()
		if err != nil {
			log.WithError(err).Error("can't setup k8s")
			return nil
		}

		vsList, err := k8s.GetVS(*ic)
		if err != nil {
			log.WithError(err).Error("can't get VirtualService")
			return nil
		}

		vs, err := json.Marshal(vsList)
		if err != nil {
			log.WithError(err).Error("can't json.Marshal file")
			return nil
		}
		fmt.Println(string(vs))
		return nil
	},
}
