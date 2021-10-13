import { useState } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export function useGetLayout() {
  const [redirectionType, setRedirectionType] = useState("");
  const [isSuccess, showSuccess] = useState(false);
  const [CSVFile, setCSVFile] = useState();
  const [formData, setFormData] = useState({
    pushGithub: false,
    enableFallback: false,
    redirection_env: "",
    redirection_namespace: "",
    fallback_value: "",
    destination_host: "",
    source_hosts: "",
  });
  const [alert, setAlert] = useState({ isVisible: false });
  const [CSVData, setCSVData] = useState([]);
  const [virtualService, setVS] = useState();
  const [prURL, setPRURL] = useState("");

  const clearData = () => {
    setCSVFile();
    setCSVData([]);
  };

  const removeRedirection = (payload) => {
    let cleanedData = [...CSVData];
    cleanedData.forEach((redirection, index) => {
      if (redirection[1] === payload) {
        cleanedData.splice(index, 1);
      }
    });
    setCSVData(cleanedData);
  };

  const handleChangeRedirectionType = (e) => {
    setRedirectionType(e.target.value);
  };

  const clearAlert = () => setAlert({ isVisible: false, content: null });

  const sendData = () => {
    if (!formData.redirection_name) {
      setAlert({ isVisible: true, content: "Redirection name must be filled" });
      return;
    }
    setPRURL("")
    setVS()
    const formDataValues = new FormData();
    formDataValues.append("csv_file", CSVFile);
    formDataValues.append("redirectionName", formData.redirection_name);
    formDataValues.append("redirectionEnv", formData.redirection_env);
    formDataValues.append("redirectionNamespace", formData.redirection_namespace);
    formDataValues.append("redirectionType", redirectionType);
    formDataValues.append("pushGithub", formData.pushGithub);
    formDataValues.append("fallbackValue", formData.fallback_value);
    formDataValues.append("destinationHost", formData.destination_host);
    formDataValues.append("sourceHosts", formData.source_hosts);
    fetch(`${publicRuntimeConfig.API_URL}api/csv/upload`, { method: "POST", body: formDataValues })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (contentType === "application/json") {
					const url = await response.json();
					setPRURL(url.PR)
        } else {
          const file = await response.blob();
          setVS(file);
        }
        clearData();
      })
      .then(() => showSuccess(true));
  };

  return {
    setCSVFile,
    setCSVData,
    CSVFile,
    CSVData,
    clearData,
    sendData,
    removeRedirection,
    handleChangeRedirectionType,
    redirectionType,
    isSuccess,
    showSuccess,
    formData,
    setFormData,
    alert,
    setAlert,
    clearAlert,
    virtualService,
    setVS,
    setPRURL,
    prURL,
  };
}
