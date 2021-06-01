import { useState } from "react";
import getConfig from "next/config";
import { useLayoutContext } from "../../context/layout-context";

const { publicRuntimeConfig } = getConfig();

export default function ModalEditVS({ payload, clean, setLoad }) {
  const { setAlert, prURL, setPRURL } = useLayoutContext();

  const [routes, setRoutes] = useState(JSON.parse(JSON.stringify(payload)))

  const updateVS = () => {
    fetch(`${publicRuntimeConfig.API_URL}api/vs/update`, { method: "POST", body: JSON.stringify(routes) })
      .then(async (res) => {
        setLoad(true)
        const payload = await res.json()
        payload.PR.length === 0 ? setAlert({ isVisible: true, content: payload.error }) : setPRURL(payload.PR)
      })
  }

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
                {routes.metadata.labels.cluster_name}/{routes.metadata.namespace}/{routes.metadata.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">host: {routes.spec.hosts[0]}</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 overflow-y-scroll">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 h-96">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {routes.spec.http.map((r, index) => {
                        return (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                {r.match[0].uri.exact ?? r.match[0].uri.regex}
                              </span>
                              <span className="ml-2 flex-1 w-0 truncate">{r.redirect?.uri ?? r.route[0].destination.host}</span>
                              <span className="ml-2 flex-1 w-0 truncate">
                                {r.redirect?.redirectCode}
                              </span>
                            </div>
                            {/* <div className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                value={index}
                                onClick={(e) => {
                                  const rs = { ...routes }
                                  rs.spec.http.splice(e.target.value, 1)
                                  setRoutes(rs)
                                }}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Remove
                              </button>
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {/* {
              prURL.length > 0 ?
                (
                  <a
                    href={prURL}
                    target="_blank"
                    rel="nofollow"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-green-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Open GitHub PR
                  </a>
                )
                :
                (
                  <button
                    onClick={() => updateVS()}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-green-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Push to GitHub
                  </button>
                )} */}
            <button
              type="button"
              onClick={() => {
                clean()
                setPRURL("")
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
