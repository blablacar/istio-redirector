# istio-redirector

> The redirections tool made for SEO managers that perfectly fit in your Istio Mesh by generating Virtual Service files from CSV.

![Demo](https://github.com/blablacar/istio-redirector/blob/master/.github/images/istio-redirector.gif?raw=true)

## What is this ?

istio-redirector is a web application that aims to ease your SEO redirections management at scale. Let your SEO managers handle all the redirections they want and get the output as a Istio Virtual Services.

SEO managers use .csv files, that is why the form takes this kind of file as only input. Depending on the type of redirections needed (3xx or 4xx), the server will generate the adequate Virtual Service.

Once generated, the file can either be added to your GitOps repository or downloaded to be manually applied on your cluster.

### The UI for SEO Managers

![Homepage](https://github.com/blablacar/istio-redirector/blob/master/.github/images/homepage.png?raw=true)


### The output for developpers/Ops

<img src="https://github.com/blablacar/istio-redirector/blob/master/.github/images/virtualservice.png?raw=true" alt="Virtual Service" height="500"/>

## Techno

- [Golang](https://golang.org/) web server
- [Next.js](https://nextjs.org/) web UI
- [Tailwind](https://tailwindcss.com/) CSS framework

## Features

### For SEO Managers

* Import your .csv file with all your redirections, and get a nice view of the parsed routes.
* In the Virtual Services tab, check all the redirections deployed in the cluster.

### For developpers/Ops

* Get a valid Virtual Service .yaml file ready to be applied to your cluster
* Manage your redirections as code
* Reduce your work and maintenance on the SEO stuff

## Installation

The easiest way to run istio-redirector is on Docker.

Either use [our Docker hub image](https://hub.docker.com/r/etifontaine/istio-redirector). Or build the image from the source with the provided Dockerfile.

We also provide the Kubernetes manifests under `_infra` along with a HelmRelease.

## Configuration file

You can configure the istio-redirector API Server through the `server/config.yaml` file. You can find an example under `server/config_example.yaml`.

## Build

### Docker
```bash
$ cp server/config_example.yaml server/config.yaml
$ docker build . -t istio-redirector
$ docker run istio-redirector
```

OR without Docker:

### Front
```bash
$ cd front
$ npm install
$ npm run build
$ npm run export
```
### Go

```bash
$ cd server
$ go build
$ istio-redirector help
```

## Commands

```bash
$ istio-redirector generate # generate yaml VirtualService from .csv file
$ istio-redirector help # show the istio-redirector help
$ istio-redirector list-vs # show the VirtualService generated with istio-redirector in your current kubectl context
$ istio-redirector web # start the web server
```

## 🔧 Pull Request Steps

istio-redirector is open source, if you think your idea can be integrated directly in istio-redirector, please create an issue or a pull request.

### Pull Request

Before creating a PR, test and check for any errors. If there are no errors, then commit and push.

For more information, please refer to the Contributing section.

## 💬 Contributing

* [Code of Conduct](https://github.com/blablacar/istio-redirector/blob/master/CODE_OF_CONDUCT.md)
* [Contributing Guideline](https://github.com/blablacar/istio-redirector/blob/master/CONTRIBUTING.md)
* [Commit Convention](https://github.com/blablacar/istio-redirector/blob/master/./github/docs/COMMIT_MESSAGE_CONVENTION.md)
* [Issue Guidelines](https://github.com/blablacar/istio-redirector/tree/master/.github/ISSUE_TEMPLATE)



## 📜 License

This software is licensed under the [Apache 2.0](https://github.com/blablacar/istio-redirector/blob/master/LICENSE) © [BlaBlaCar](https://github.com/blablacar).