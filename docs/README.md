# Istio redirector

> The redirections tool made for SEO managers that perfectly fit in your Istio Mesh by generating Virtual Service files from CSV.

![Demo](https://github.com/etifontaine/istio-redirector/blob/master/.github/images/istio-redirector.gif?raw=true)

## What is this?

Istio redirector is a web application aims to ease your SEO redirections management at scale. Let your SEO managers handle all the redirections they want and get the output as a Istio Virtual Service.

SEO managers use .csv files, that is why the form takes this kind of file as only input. Depending on the type of redirections needed (3xx or 4xx), the server will generate the adequate Virtual Service.

Once generated, the file can either be added to your GitOps repository or downloaded to be manually applied on your cluster. If you have enabled the GitHub feature, istio-redirector can directly create a PR with the new VirtualService to be ready to deploy in your clusters.

### The UI for SEO Managers

![Homepage](https://github.com/etifontaine/istio-redirector/blob/master/.github/images/homepage.png?raw=true)


### The output for developpers/Ops

<img src="https://raw.githubusercontent.com/etifontaine/istio-redirector/master/.github/images/virtualservice.png" alt="Virtual Service" height="500"/>

## Features

### For SEO Managers

* Import your .csv file with all your redirections, and get a nice view of the parsed routes.

### For developpers/Ops

* Get a valid Virtual Service .yaml file ready to be applied to your cluster
* Manage your redirections as code
* Reduce your work and maintenance on the SEO stuff
* Generate redirections from your CLI with `./istio-redirector generate -s test-redirections.csv -d output-vs.yaml`
* Start the web server with `./istio-redirector web`

## Techno

- [Golang](https://golang.org/) web server
- [Next.js](https://nextjs.org/) web UI
- [Tailwind](https://tailwindcss.com/) CSS framework

## 💬 Contributing

* [Code of Conduct](https://github.com/etifontaine/istio-redirector/blob/main/CODE_OF_CONDUCT.md)
* [Contributing Guideline](https://github.com/etifontaine/istio-redirector/blob/main/CONTRIBUTING.md)
* [Commit Convention](https://github.com/etifontaine/istio-redirector/blob/main/.github/docs/COMMIT_MESSAGE_CONVENTION.md)
* [Issue Guidelines](https://github.com/etifontaine/istio-redirector/tree/main/.github/ISSUE_TEMPLATE)



## 📜 License

This software is licensed under the [MIT](https://github.com/etifontaine/istio-redirector/blob/master/LICENSE) © [etifontaine](https://github.com/etifontaine).