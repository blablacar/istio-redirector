import Papa from "papaparse";
import { useLayoutContext } from "../../context/layout-context";

const Form = ({ clusterEnv, clusterNs, clusterSVC }) => {
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

  const handleChange = (event) => {
    switch (event.target.name) {
      case "redirection_name":
        setFormData({ ...formData, redirection_name: event.target.value });
        break;
      case "destination_host":
        setFormData({ ...formData, destination_host: event.target.value });
        break;
      case "fallback_value":
        setFormData({ ...formData, fallback_value: event.target.value.trim() });
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
              <label htmlFor="redirection_env" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="redirection_namespace" className="block text-sm font-medium text-gray-700">
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
          <div className="grid grid-cols-8 gap-8 mt-5">
            <div className="col-span-8 sm:col-span-2">
              <label htmlFor="fallback_value" className="block text-sm font-medium text-gray-700">
                Fallback - <small>/bus($|/.*)</small>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="fallback_value"
                id="fallback_value"
                placeholder="Leave empty if not needed"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-8 sm:col-span-2">
              <label htmlFor="source_hosts" className="block text-sm font-medium text-gray-700">
                Hosts - <small>separated with a ;</small>
              </label>
              <input
                onChange={handleChange}
                type="text"
                value={formData.source_hosts}
                name="source_hosts"
                id="source_hosts"
                placeholder="Leave empty if in the .csv"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {redirectionType === '4xx' || formData.fallback_value.length > 0 ? (
              <div className="col-span-8 sm:col-span-2">
                <label htmlFor="destination_host" className="block text-sm font-medium text-gray-700">
                  Destination host
                </label>
                <select
                  onChange={handleChange}
                  value={formData.destination_host}
                  id="destination_host"
                  name="destination_host"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled defaultValue={""}>
                    Select your option
                  </option>
                  {clusterSVC.map((svc) => {
                    return (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
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
              <p className="mt-5">
                This will generate a single VirtualService, in the cluster <strong>{formData.redirection_env}</strong>,
                in the namespace <strong>{formData.redirection_namespace}</strong>.<br />
                It will have the name <strong>{formData.redirection_name}</strong>.<br />
                {formData.fallback_value.length > 0 ? (
                  <>All requests not handled in the following redirections, matching <strong>{formData.fallback_value} </strong>
                    will be forwarded to the Kubernetes Service <strong>{formData.destination_host}.svc.cluster.local</strong></>) : null}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-center border-2 border-gray-300 border-dashed rounded-md">
            <label
              htmlFor="file-upload"
              className="text-center flex justify-center h-10 items-center cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload your .csv file with the redirections</span>
              <input
                onChange={handleChange}
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".csv"
                className="sr-only"
              />
            </label>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Form;
