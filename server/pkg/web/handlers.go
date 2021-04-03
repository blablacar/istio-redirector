package web

import (
	"fmt"
	"io"
	"istio-redirector/pkg/redirections"
	"net/http"

	"github.com/n0rad/go-erlog/logs"
)

func UploadCSVHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20)
	file, _, err := r.FormFile("csv_file")
	if err != nil {
		logs.WithE(err).Error("can't get csv file from form")
		return
	}
	defer file.Close()

	payload, err := redirections.Generate(
		redirections.InputData{
			File:            file,
			RedirectionName: r.FormValue("redirection_name"),
		},
	)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}

	//copy the relevant headers. If you want to preserve the downloaded file name, extract it with go's url parser.
	w.Header().Set("Content-Disposition", "attachment; filename=virtual-service.yaml")
	w.Header().Set("Content-Type", r.Header.Get("Content-Type"))
	w.Header().Set("Content-Length", fmt.Sprintf("%d", payload.Len()))

	//stream the body to the client without fully loading it into memory
	io.Copy(w, &payload)
}

func CheckURL(w http.ResponseWriter, r *http.Request) {
	urlParams := r.URL.Query()
	url := urlParams["url"][0]
	if len(urlParams) == 0 || url == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("url parameter is missing"))
		return
	}

	client := &http.Client{}

	resp, err := client.Head(url)

	if err != nil {
		fmt.Println(err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("url parameter is missing"))
		return
	}

	fmt.Println(url, " status is : ", resp.Status)
	return
}
