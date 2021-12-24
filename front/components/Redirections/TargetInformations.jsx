const TargetInformations = ({ formData }) => {

    const renderSelectedValue = (value) => {
        return value ? value : "TO BE SELECTED"
    }

    const renderHelperFromType = (type) => {
        if (type === "3xx") {
            return (
                <>
                    <strong>Expected .csv file format: </strong>
                    <span>from,to,status</span>
                    <br />
                    <strong>Example: </strong>
                    <span>/my-page,/my-new-page,301</span>
                </>
            )
        } else if (type === "4xx") {
            return (
                <>
                    <strong>Expected .csv file format: </strong>
                    <span>url,status</span>
                    <br />
                    <strong>Example: </strong>
                    <span>/my-page,410</span>
                </>
            )
        }
    }

    return (
        <div className="w-full rounded-lg shadow-lg p-4 flex md:flex-row flex-col">
            <div className="flex-1">
                <p className="text-gray-500 my-1">{renderHelperFromType(formData.redirection_type)}</p>
                <p className="mt-5">
                    This will generate a single VirtualService, in the cluster <strong>{renderSelectedValue(formData.redirection_env)}</strong>,
                    in the namespace <strong>{renderSelectedValue(formData.redirection_namespace)}</strong>.<br />
                    It will have the name <strong>{renderSelectedValue(formData.redirection_name)}</strong>.<br />
                </p>
            </div>
        </div>
    );
};

export default TargetInformations;
