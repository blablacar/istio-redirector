export const renderTableHeader = (values) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {values.map((value, index) => {
                    return (
                        <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate"
                        >
                            {value}
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

export const renderRow = (value) => {
    return (
        <td className="px-6 py-4 w-56">
            <p className="text-sm text-gray-900 w-56">{value}</p>
        </td>
    )
}