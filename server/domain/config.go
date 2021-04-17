package domain

type Config struct {
	Server Server
}

type Server struct {
	URL            string
	AllowedOrigins []string
}

// Context contains the global given parameters to run the checkup/cure
type Context struct {
	Verbose bool
	DryRun  bool
}
