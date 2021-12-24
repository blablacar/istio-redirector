const UploadButton = ({ handleChange, hasData }) => {
    return (
        !hasData && <div className={`mt-20 flex flex-col justify-center border-2 border-gray-300 border-dashed rounded-md`}>
            <label
                htmlFor="file-upload"
                className="text-center flex justify-center h-10 items-center cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
                <span>Click here to upload your .csv file with the redirections</span>
                <input
                    onChange={handleChange}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept=".csv"
                    className="sr-only"
                />
            </label>
        </div>
    );
};

export default UploadButton;
