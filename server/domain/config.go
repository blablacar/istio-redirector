package domain

type Config struct {
	Server Server
}

type Server struct {
	URL            string
	AllowedOrigins []string
}
