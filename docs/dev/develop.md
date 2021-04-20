### Develop

#### Front side

- Start the dev server: `cd front/; npm run dev`
- Access the UI on `localhost:3000`

#### Server side

- Start the dev API server: `cd server/; go run . web`
- Test the API on `localhost:8080`


You can also directly generate VirtualService.yaml from a .csv file by running `go run . generate -s ./mocks/csv/status_301.csv -d my-generate-vs.yaml`