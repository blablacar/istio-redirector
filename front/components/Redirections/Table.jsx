import { renderRow, renderTableHeader } from "../../utils/table";

const Table = ({ CSVData, redirectionType }) => {

  return (
    CSVData.length > 0 && <div className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {renderTableHeader(["Status Code", "Source URL", redirectionType === "3xx" ? "Target URL" : null])}
              <tbody className="bg-white divide-y divide-gray-200">
                {CSVData.map((line, index) => {
                  if (redirectionType === "3xx") {
                    return (
                      <tr key={index}>
                        {renderRow(line[2])}
                        {renderRow(line[0])}
                        {renderRow(line[1])}
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        {renderRow(line[1])}
                        {renderRow(line[0])}
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
