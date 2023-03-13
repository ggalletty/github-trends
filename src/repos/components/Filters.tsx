import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../common/state";
import { actions } from "../state";

type Props = {};

export const Filters = ({
  changeOrder,
  currentFilter,
  currentOrder,
  toggleFilter,
}: Props & StateProps) => {
  const handleFilterChange = () => {
    const newFilter = currentFilter === "starred" ? "all" : "starred";
    toggleFilter(newFilter);
  };

  const handleOrderChange = (evt: any) => {
    changeOrder(evt.target.value);
  };
  return (
    <>
      <div className="flex justify-end">
        <div className="flex items-center w-4/12 pl-4 border border-gray-200 rounded dark:border-gray-700">
          <div className="flex items-center w-6/12">
            <input
              type="checkbox"
              onChange={handleFilterChange}
              id="starred"
              className="w-6 h-6 mx-2 rounded text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="starred"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none"
            >
              Show starred only
            </label>
          </div>
          <div className="flex items-center w-6/12">
            <label
              htmlFor="displayOrder"
              className="flex flex-shrink-0 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sort order
            </label>
            <select
              name="displayOrder"
              id="displayOrder"
              defaultValue={currentOrder}
              onChange={handleOrderChange}
              className="ml-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

const connector = connect(
  (state: RootState) => ({
    currentFilter: state.repos.filter,
    currentOrder: state.repos.sortOrder,
  }),
  {
    toggleFilter: actions.setFilter,
    changeOrder: actions.changeOrder,
  }
);
type StateProps = ConnectedProps<typeof connector>;

export default connector(Filters);
