import { useEffect, useState } from 'react';
import Question from '../components/Documentation/Question'
import Layout from '../components/Layout'

let documentations = require('../config/documentation.json');

export default function Documentation() {

  const [isOpen, setIsOpen] = useState([])

  useEffect(() => {
    let status = []
    const items = documentations.map(documentation => {
      status.push({ documentation, status: false })
    })
    setIsOpen(status)
  }, documentations)

  const toggleQuestion = (index) => {
    let status = [...isOpen]
    status[index].status = !status[index].status
    setIsOpen(status)
  }

  return (
    <Layout>
      <div className="pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="p-2 rounded">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 p-4 text-sm">
                <div className="text-3xl">How to use <span className="font-medium">Istio redirector</span></div>
                <div className="my-2">First time using this tool ?</div>
                <div className="mb-2">Wondering how to use this service ?</div>
                <div className="text-xs text-gray-600">Dive into our FAQ for more details</div>
              </div>
              <div className="md:w-2/3">
                <div className="p-4">
                  {
                    documentations.map((documentation, index) => {
                      return <Question key={index} toggle={(index) => toggleQuestion(index)} index={index} status={isOpen[index]?.status} documentation={documentation} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
