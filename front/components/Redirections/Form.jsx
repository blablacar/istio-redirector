import Papa from "papaparse";
import getConfig from "next/config";
import { useLayoutContext } from "../../context/layout-context";
import { useEffect, useState } from "react";

const { publicRuntimeConfig } = getConfig();

const Form = () => {
  const {
    setCSVFile,
    setCSVData,
    handleChangeRedirectionType,
    redirectionType,
    setFormData,
    formData,
    CSVData,
    setAlert,
  } = useLayoutContext();

  const [clusterEnv, setClusterEnv] = useState([]);
  const [clusterNs, setClusterNs] = useState([]);

  useEffect(() => {
    fetch(`${publicRuntimeConfig.API_URL}api/config`).then(async (res) => {
      const payload = await res.json()
      setClusterNs(payload.AvailableNamespace);
      setClusterEnv(payload.AvailableCluster);
    });
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "redirection_name":
        setFormData({ ...formData, redirection_name: event.target.value });
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
  };

  return (
    <div>
      <div>
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-8 gap-8">
            <div className="col-span-8 sm:col-span-2">
              <label htmlFor="redirection_type" className="block text-sm font-medium text-gray-700">
                Redirection type
              </label>
              <select
                onChange={handleChangeRedirectionType}
                value={redirectionType}
                id="redirection_type"
                name="redirection_type"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled defaultValue={""}>
                  Select your option
                </option>
                <option value="3xx">3xx</option>
                <option value="4xx">4xx</option>
              </select>
            </div>
            <div className="col-span-8 sm:col-span-2">
              <label htmlFor="redirection_type" className="block text-sm font-medium text-gray-700">
                Environment
              </label>
              <select
                onChange={handleChange}
                value={formData.redirection_env}
                id="redirection_env"
                name="redirection_env"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled defaultValue={""}>
                  Select your option
                </option>
                {clusterEnv.map((env) => {
                  return (
                    <option key={env} value={env}>
                      {env}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-8 sm:col-span-2">
              <label htmlFor="redirection_type" className="block text-sm font-medium text-gray-700">
                Namespace
              </label>
              <select
                onChange={handleChange}
                value={formData.redirection_namespace}
                id="redirection_namespace"
                name="redirection_namespace"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled defaultValue={""}>
                  Select your option
                </option>
                {clusterNs.sort().map((ns) => {
                  return (
                    <option key={ns} value={ns}>
                      {ns}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-8 sm:col-span-2">
              <label htmlFor="redirection_name" className="block text-sm font-medium text-gray-700">
                Redirection group name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="redirection_name"
                id="redirection_name"
                placeholder="redirection-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      {redirectionType.length > 0 && CSVData.length === 0 ? (
        <>
          <div className="w-full rounded-lg shadow-lg p-4 flex md:flex-row flex-col">
            <div className="flex-1">
              <p className="text-gray-500 my-1">
                {redirectionType === "3xx" ? (
                  <>
                    <strong>Expected .csv file format: </strong>
                    <span>from,to,status</span>
                    <br />
                    <strong>Example: </strong>
                    <span>/my-page,/my-new-page,301</span>
                  </>
                ) : (
                  <>
                    <strong>Expected .csv file format: </strong>
                    <span>url,status</span>
                    <br />
                    <strong>Example: </strong>
                    <span>/my-page,410</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    onChange={handleChange}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept=".csv"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">.csv</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Form;
