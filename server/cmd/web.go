package cmd

import (
	"istio-redirector/domain"
	"istio-redirector/pkg/web"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func init() {
	rootCmd.AddCommand(webCmd)
}

var webCmd = &cobra.Command{
	Use:   "web",
	Short: "Start API HTTP server",
	RunE: func(cmd *cobra.Command, args []string) error {

		var serverConfig domain.Config
		// Set the file name of the configurations file
		viper.SetConfigName("config")
		// Set the path to look for the configurations file
		viper.AddConfigPath(".")
		viper.SetConfigType("yaml")

		if err := viper.ReadInConfig(); err != nil {
			log.WithError(err).Error("can't read config.yaml")
		}

		err := viper.Unmarshal(&serverConfig)
		if err != nil {
			log.WithError(err).Error("unable to decode into struct")
		}

		web.Serve(serverConfig)

		return nil
	},
}
