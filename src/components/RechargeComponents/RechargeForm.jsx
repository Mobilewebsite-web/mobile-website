const RechargeForm = () => {

  const handleSubmit = (e)=>{
          e.preventDefault()
  }
  return (
    <div className=" mt-10">
      <form className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
        {/* User ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="userId" className="text-sm font-medium text-zinc-700">
            User ID
          </label>
          <input
            type="number"
            id="userId"
            placeholder="Enter your User ID"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Zone ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="zoneId" className="text-sm font-medium text-zinc-700">
            Zone ID
          </label>
          <input
            type="number"
            id="zoneId"
            placeholder="Enter your Zone ID"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Check Username
        </button>
      </form>
    </div>
  );
};

export default RechargeForm;
