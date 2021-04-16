module istio-redirector

go 1.16

require (
	github.com/google/go-github/v35 v35.0.0
	github.com/gorilla/handlers v1.5.1
	github.com/gorilla/mux v1.8.0
	github.com/n0rad/go-erlog v0.0.0-20190510152055-0a033e8086d8
	github.com/prometheus/client_golang v1.9.0
	github.com/spf13/cobra v1.1.3
	github.com/spf13/viper v1.7.1
	golang.org/x/oauth2 v0.0.0-20210413134643-5e61552d6c78
	istio.io/client-go v1.9.2
	k8s.io/apimachinery v0.20.1
	sigs.k8s.io/yaml v1.2.0
)
