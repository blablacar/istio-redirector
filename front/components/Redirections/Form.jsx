import Papa from "papaparse";
import { useState } from "react";
import getConfig from "next/config";
import { defaultFormValues } from "../../pages";
import Check from "../Icons/check";
import Cross from "../Icons/cross";
import TargetInformations from "./TargetInformations";
import UploadButton from "./UploadButton";

const { publicRuntimeConfig } = getConfig();

const Form = ({ sourceInfo, setCSVData, CSVData, formData, setFormData, setAlert, setModal }) => {

  const [CSVFile, setCSVFile] = useState()

  const handleChange = (event) => {
    switch (event.target.name) {
      case "pushGithub":
        setFormData({ ...formData, pushGithub: event.target.value });
        break;
      case "redirection_type":
        setFormData({ ...formData, redirection_type: event.target.value });
        break;
      case "redirection_name":
        setFormData({ ...formData, redirection_name: event.target.value });
        break;
      case "destination_host":
        setFormData({ ...formData, destination_host: event.target.value });
        break;
      case "source_hosts":
        setFormData({ ...formData, source_hosts: event.target.value.trim() });
        break;
      case "redirection_env":
        setFormData({ ...formData, redirection_env: event.target.value });
        break;
      case "redirection_namespace":
        setFormData({ ...formData, redirection_namespace: event.target.value });
        break;
      case "file-upload":
        setCSVFile(event.target.files[0]);
        Papa.parse(event.target.files[0], {
          complete: showCSV,
          header: false,
          skipEmptyLines: true,
        });
        break;
      default:
        break;
    }
  };

  const showCSV = (result) => {
    if (result.data.length > 5000) {
      setAlert({ isVisible: true, content: "You can't add more than 5 000 redirections at once" });
      return;
    }
    setCSVData(result.data);
    const domains = [...new Set(result.data.map(element => (new URL(element[0])).host))]
    setFormData({ ...formData, source_hosts: domains.join(';') })
  };

  const renderSelectInput = ({ label, id }) => {

    const values = {
      "redirection_type": ["3xx", "4xx"],
      "redirection_env": sourceInfo.AvailableCluster,
      "redirection_namespace": sourceInfo.AvailableNamespace.sort(),
      "destination_host": sourceInfo.AvailableDestinationSvc,
    }

    return (
      <div className="col-span-8 sm:col-span-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          onChange={handleChange}
          value={formData[id]}
          id={id}
          name={id}
          disabled={id === "destination_host" && formData.redirection_type === '3xx'}
          className={`${id === "destination_host" && formData.redirection_type === '3xx' ? "cursor-not-allowed" : "cursor-pointer"} mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="" disabled defaultValue={""}>
            Select your option
          </option>
          {values[id].map((value, index) => {
            return <option key={index} value={value}>{value}</option>
          })}
        </select>
      </div>
    )
  }

  const renderTextInput = ({ label, id }) => {
    return (
      <div className="col-span-8 sm:col-span-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={formData[id]}
          name={id}
          id={id}
          placeholder={label}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    )
  }

  const renderCheckboxInput = ({ label, id }) => {
    return (
      <div className="col-span-8 sm:col-span-2">
        <label className="inline-flex items-center ml-6 cursor-pointer" htmlFor={id}>
          <input
            type="checkbox"
            className="form-radio"
            name={id}
            id={id}
            onChange={handleChange}
          />
          <span className="ml-2">{label}</span>
        </label>
      </div>
    )
  }

  const sendData = () => {
    if (!formData.redirection_name) {
      setAlert({ isVisible: true, content: "Redirection group name must be filled" });
      return;
    }
    if (CSVData.length === 0) {
      setAlert({ isVisible: true, content: "CSV file is empty" });
      return;
    }
    if (!formData.redirection_env) {
      setAlert({ isVisible: true, content: "The environment has not been selected" });
      return;
    }
    if (!formData.redirection_namespace) {
      setAlert({ isVisible: true, content: "The namespace has not been selected" });
      return;
    }
    if (!formData.redirection_type) {
      setAlert({ isVisible: true, content: "The redirection type has not been selected" });
      return;
    }
    if (!formData.source_hosts) {
      setAlert({ isVisible: true, content: "The host list is empty" });
      return;
    }

    const formDataValues = new FormData();
    formDataValues.append("csv_file", CSVFile);
    formDataValues.append("redirectionName", formData.redirection_name);
    formDataValues.append("redirectionEnv", formData.redirection_env);
    formDataValues.append("redirectionNamespace", formData.redirection_namespace);
    formDataValues.append("redirectionType", formData.redirection_type);
    formDataValues.append("pushGithub", formData.pushGithub === "on");
    formDataValues.append("destinationHost", formData.destination_host);
    formDataValues.append("sourceHosts", formData.source_hosts);
    fetch(`${publicRuntimeConfig.API_URL}api/csv/upload`, { method: "POST", body: formDataValues })
      .then(async (response) => {
        if (response.status >= 400) {
          const err = await response.json()
          throw Error(err.error)
        }
        const contentType = response.headers.get("content-type");
        const payload = contentType === "application/json" ? await response.json() : await response.blob();
        clearData();
        setModal({
          isVisible: true,
          isJSON: contentType === "application/json",
          payload
        })
      }).catch(async err => {
        setAlert({ isVisible: true, content: `An error happened server side: ${err.message}` })
      })
  };

  const clearData = () => {
    setCSVData([])
    setCSVFile([])
    setFormData(defaultFormValues)
  }

  return (
    <div>
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-8 gap-8">
          {renderSelectInput({ label: "Redirection type", id: "redirection_type" })}
          {renderSelectInput({ label: "Environment", id: "redirection_env" })}
          {renderSelectInput({ label: "Namespace", id: "redirection_namespace" })}
          {renderTextInput({ label: "Redirection group name", id: "redirection_name" })}
        </div>
        <div className="grid grid-cols-8 gap-8 mt-5">
          {renderTextInput({ label: "Hosts", id: "source_hosts" })}
          {renderSelectInput({ label: "Destination host", id: "destination_host" })}
          {sourceInfo.EnableGitHub && renderCheckboxInput({ label: "Create PR on GitHub", id: "pushGithub" })}
          <div className="col-span-8 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Action
            </label>
            <div className="flex justify-between">
              <button
                onClick={() => clearData()}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Cross />
                Reset
              </button>
              <button
                onClick={sendData}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Check />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <TargetInformations formData={formData} />
      <UploadButton handleChange={handleChange} hasData={CSVData.length > 0} />
    </div>
  );
};

export default Form;
