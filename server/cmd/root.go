package cmd

import (
	"os"

	"github.com/n0rad/go-erlog/logs"
	_ "github.com/n0rad/go-erlog/register"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "istio-redirector",
	Short: "Istio VirtualService generator from .csv file",
	Long:  `istio-redirector generate VirtualService for 3xx and 4xx redirections.`,
}

// ExecuteCmd adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func ExecuteCmd() {
	if err := rootCmd.Execute(); err != nil {
		logs.WithError(err).Error("An error occurred")
		os.Exit(1)
	}
}
