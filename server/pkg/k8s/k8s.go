package k8s

import (
	"fmt"
	"os"
	"strings"

	"k8s.io/client-go/tools/clientcmd"

	versionedclient "istio.io/client-go/pkg/clientset/versioned"
	_ "k8s.io/client-go/plugin/pkg/client/auth"
)

func Setup() (*versionedclient.Clientset, error) {
	ic := &versionedclient.Clientset{}

	//kubeconfig := os.Getenv("KUBECONFIG")
	home, _ := os.UserHomeDir()
	kubeconfig := strings.Replace("~/.kube/config", "~", home, 1)
	if len(kubeconfig) == 0 {
		return ic, fmt.Errorf("environment variables kubeconfig need to be set")
	}

	restConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return ic, fmt.Errorf("failed to create k8s rest client: %s", err)
	}

	ic, err = versionedclient.NewForConfig(restConfig)
	if err != nil {
		return ic, fmt.Errorf("failed to create istio client: %s", err)
	}

	return ic, nil
}
