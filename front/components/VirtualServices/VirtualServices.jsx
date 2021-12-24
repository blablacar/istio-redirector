import { useEffect, useState } from "react";
import getConfig from "next/config";
import Modal from "./Modal";
import Loader from "../Icons/Loader";
import Table from "./Table";

const { publicRuntimeConfig } = getConfig();

export default function VirtualServices() {
  const [currentVS, setCurrentVS] = useState();
  const [vs, setVS] = useState();

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    fetch(`${publicRuntimeConfig.API_URL}api/vs/get`)
      .then(async (response) => setVS(await response.json()))
      .catch((err) => {
        console.log(err);
      });
  }

  const sumRedirections = () => {
    let totalReditions = 0
    vs.map(v => {
      totalReditions += v.spec.http.length
    })
    return totalReditions
  }

  const renderTopPanel = ({ title, value }) => {
    return (
      <div className="rounded-md shadow py-5 px-10 mr-10">
        <p className="text-xl">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Existing redirections in the cluster
        </h2>
        {vs && (
          <div>
            <div className="flex flex-row mt-8">
              {renderTopPanel({ title: "Virtual Services", value: vs.length })}
              {renderTopPanel({ title: "Amount of rules", value: sumRedirections() })}
            </div>
          </div>
        )}
        <div className="flex flex-col mt-8">
          {currentVS && <Modal payload={currentVS} clean={() => setCurrentVS()} />}
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {!vs ?
                  <div className="text-gray-900 h-48 flex justify-center items-center">
                    <Loader />
                    Loading existing redirections from the cluster...
                  </div>
                  : <Table setCurrentVS={setCurrentVS} vs={vs} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
