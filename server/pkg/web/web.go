package web

import (
	"context"
	"istio-redirector/domain"
	"os"
	"os/signal"
	"time"

	log "github.com/sirupsen/logrus"
)

func Serve(serverConfig domain.Config) {

	srv := register(serverConfig)

	// Run our server in a goroutine so that it doesn't block.
	go func() {
		log.WithFields(log.Fields{
			"address": serverConfig.Server.URL,
		}).Debug("server has started")
		if err := srv.ListenAndServe(); err != nil {
			log.WithError(err).Error("server has stopped")
		}
	}()

	c := make(chan os.Signal, 1)
	// We'll accept graceful shutdowns when quit via SIGINT (Ctrl+C)
	// SIGKILL, SIGQUIT or SIGTERM (Ctrl+/) will not be caught.
	signal.Notify(c, os.Interrupt)

	// Block until we receive our signal.
	<-c

	// Create a deadline to wait for.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()
	// Doesn't block if no connections, but will otherwise wait
	// until the timeout deadline.
	srv.Shutdown(ctx)
	// Optionally, you could run srv.Shutdown in a goroutine and block on
	// <-ctx.Done() if your application should wait for other services
	// to finalize based on context cancellation.
	log.Info("shutting down")
	os.Exit(0)
}
