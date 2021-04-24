import { useEffect, useState } from "react";
import getConfig from "next/config";
import Layout from "../components/Layout";
import VirtualServices from "../components/VirtualServices/VirtualServices";

const { publicRuntimeConfig } = getConfig();

export default function VirtualServicesPage() {
  const [vs, setVS] = useState([]);

  useEffect(() => {
    fetch(`${publicRuntimeConfig.API_URL}api/vs/get`)
      .then(async (response) => setVS(await response.json()))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Existing redirections
          </h2>
          <div className="flex flex-col mt-8">
            <VirtualServices vs={vs} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
