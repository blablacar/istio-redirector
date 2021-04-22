package cmd

import (
	"bufio"
	"io/ioutil"
	"istio-redirector/domain"
	"istio-redirector/pkg/redirections"
	"os"

	"github.com/n0rad/go-erlog/logs"
	"github.com/spf13/cobra"
)

var sourceFile string
var outputFile string

func init() {
	generateCmd.Flags().StringVarP(&sourceFile, "source", "s", "", "The .csv file with the redirections")
	generateCmd.Flags().StringVarP(&outputFile, "destination", "d", "", "The path where you want to output the VirtualSerivce.yaml")
	rootCmd.AddCommand(generateCmd)
}

var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate yaml VirtualService from .csv file",
	Long:  "Take a .csv file in input and generate a VirtualService",
	RunE: func(cmd *cobra.Command, args []string) error {

		payload, err := ioutil.ReadFile(sourceFile)
		if err != nil {
			logs.WithE(err).Error("can't read file")
			return nil
		}

		content, err := redirections.Generate(
			domain.InputData{
				File:            payload,
				RedirectionName: "test-preprod",
				RedirectionType: "3xx",
			},
		)
		if err != nil {
			logs.WithE(err).Error("can't generate file")
			return nil
		}

		file, err := os.Create(outputFile)
		if err != nil {
			logs.WithE(err).Error("can't create file")
			return nil
		}
		writer := bufio.NewWriter(file)
		_, err = writer.WriteString(content.String())
		if err != nil {
			logs.WithE(err).Error("can't write file")
			return nil
		}
		writer.Flush()

		return nil
	},
}
