import getConfig from "next/config";
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import { useState } from "react";
import Modal from "../components/Redirections/Modal";
import Form from "../components/Redirections/Form";
import Table from "../components/Redirections/Table";
const { publicRuntimeConfig } = getConfig();

export async function getStaticProps() {
  const payload = await fetch(`${publicRuntimeConfig.API_URL}api/config`).then(async (res) => await res.json());

  return {
    props: {
      payload
    },
  }
}

export const defaultFormValues = {
  pushGithub: false,
  redirection_type: "3xx",
  redirection_env: "",
  redirection_name: "",
  redirection_namespace: "",
  destination_host: "",
  source_hosts: "",
}

export const defaultPayload = {
  isVisible: false,
  content: ''
}

export default function Home({ payload }) {

  const [CSVData, setCSVData] = useState([])
  const [alert, setAlert] = useState(defaultPayload)
  const [modal, setModal] = useState(defaultPayload)
  const [formData, setFormData] = useState(defaultFormValues);

  return (
    <Layout>
      <main>
        <Modal modal={modal} setModal={setModal} />
        <Alert alert={alert} setAlert={setAlert} />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">istio-redirector</h2>
            </div>
            <Form sourceInfo={payload} setAlert={setAlert} setModal={setModal} setCSVData={setCSVData} CSVData={CSVData} setFormData={setFormData} formData={formData} />
            <Table CSVData={CSVData} redirectionType={formData.redirection_type} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
