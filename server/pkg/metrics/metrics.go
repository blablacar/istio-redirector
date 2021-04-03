package metrics

import (
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	CSVFileImported = prometheus.NewCounter(
		prometheus.CounterOpts{
			Name: "csv_imported",
			Help: "Amount of csv file imported",
		})
)

func RegisterPrometheus(m *mux.Router) *mux.Router {
	prometheus.MustRegister(CSVFileImported)

	m.Handle("/metrics", promhttp.Handler())
	return m
}
