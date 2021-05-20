import Layout from "../components/Layout";
import VirtualServices from "../components/VirtualServices/VirtualServices";

export default function VirtualServicesPage() {

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Existing redirections
          </h2>
          <div className="flex flex-col mt-8">
            <VirtualServices />
          </div>
        </div>
      </div>
    </Layout>
  );
}
