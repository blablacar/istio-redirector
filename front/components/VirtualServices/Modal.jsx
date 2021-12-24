import { useState } from "react";
import { renderRow, renderTableHeader } from "../../utils/table";

export default function ModalVS({ payload, clean }) {

  const [routes] = useState(JSON.parse(JSON.stringify(payload)))

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {routes.metadata.namespace}/{routes.metadata.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">host: {routes.spec.hosts[0]}</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 overflow-y-scroll">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 h-96">
                    <table className="min-w-full table-fixed divide-y divide-gray-200">
                      {renderTableHeader(["Status Code", "Source URL", routes.spec.http[0].redirect ? "Target URL" : null])}
                      <tbody className="bg-white divide-y divide-gray-200">
                        {routes.spec.http.map((r, index) => {
                          if (r.redirect) {
                            return (
                              <tr key={index}>
                                {renderRow(r.redirect.redirectCode)}
                                {renderRow(r.match[0].uri.exact)}
                                {renderRow(r.redirect.uri)}
                              </tr>
                            );
                          } else {
                            return (
                              <tr key={index}>
                                {renderRow(r.fault.abort.httpStatus)}
                                {renderRow(r.match[0].uri.exact)}
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                clean()
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
