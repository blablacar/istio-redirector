package cmd

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"istio-redirector/domain"
	"istio-redirector/pkg/redirections"
	"log"
	"os"

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
			fmt.Printf("can't read file: %v", err)
		}

		content, err := redirections.Generate(
			domain.InputData{
				File:            payload,
				RedirectionName: "test-preprod",
				RedirectionType: "3xx",
			},
		)
		if err != nil {
			log.Fatal(err)
		}

		file, err := os.Create(outputFile)
		if err != nil {
			log.Fatal(err)
		}
		writer := bufio.NewWriter(file)
		_, err = writer.WriteString(content.String())
		if err != nil {
			log.Fatal(err)
		}
		writer.Flush()

		return nil
	},
}
