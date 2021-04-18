import Form from "./Form";
import { useLayoutContext } from "../../context/layout-context";
import Table from "./Table";
import Modal from "./Modal";

export default function Redirections() {
  const { CSVData, clearData, sendData, isSuccess, setFormData, formData } = useLayoutContext();

  return (
    <main>
      {isSuccess ? <Modal /> : null}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Istio Redirector
            </h2>
            {CSVData.length > 0 ? (
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="sm:ml-3">
                  <button
                    onClick={clearData}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clean
                  </button>
                </span>
                <div>
                  <span className="sm:ml-3">
                    <button
                      onClick={sendData}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Send
                    </button>
                  </span>
                  <div className="sm:ml-3 mt-1 flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="pushGithub"
                        name="pushGithub"
                        type="checkbox"
                        onChange={(e) => {
                          setFormData({ ...formData, pushGithub: e.target.checked });
                        }}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="pushGithub" className="font-medium text-gray-700">
                        Push to GitHub
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <Form />
          {CSVData.length > 0 ? <Table /> : null}
        </div>
      </div>
    </main>
  );
}
