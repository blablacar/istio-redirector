package k8s

import (
	"context"
	"fmt"

	"istio.io/client-go/pkg/apis/networking/v1beta1"
	"istio.io/client-go/pkg/clientset/versioned"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func GetVS(ic versioned.Clientset) (*v1beta1.VirtualServiceList, error) {
	namespace := "" // get from all namespaces
	vsList, err := ic.NetworkingV1beta1().VirtualServices(namespace).List(context.TODO(), metav1.ListOptions{
		LabelSelector: "app=istio-redirector-generated",
	})
	if err != nil {
		return vsList, fmt.Errorf("failed to get VirtualService in %s namespace: %s", namespace, err)
	}

	return vsList, nil
}
