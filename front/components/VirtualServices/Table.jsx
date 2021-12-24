import { renderTableHeader } from "../../utils/table";
import View from "../Icons/view";

export default function Table({ setCurrentVS, vs }) {

    const renderRow = (value) => {
        return (
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{value}</div>
            </td>
        )
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            {renderTableHeader(["Name", "Namespace", "Host", "Amount of rules", "Created at", "View"])}
            <tbody className="bg-white divide-y divide-gray-200">
                {vs.map((v, index) => {
                    return (
                        <tr key={index}>
                            {renderRow(v.metadata.name)}
                            {renderRow(v.metadata.namespace)}
                            {renderRow(v.spec.hosts[0])}
                            {renderRow(v.spec.http.length)}
                            {renderRow(v.metadata.creationTimestamp)}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => setCurrentVS(v)}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <View />
                                    View
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
