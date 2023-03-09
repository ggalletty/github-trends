import Filters from "./repos/components/Filters";
import Table from "./repos/components/Table";

function App() {
  return (
    <div className="container bg-gray-50 mx-auto rounded-xl p-10">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-3xl font-extrabold leading-6 text-gray-900">
          GitHub Trends ✨
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          A collection of the latest and hottest repos in GitHub.
        </p>
      </div>
      <Filters />
      <Table />
    </div>
  );
}

export default App;
