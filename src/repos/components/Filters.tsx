import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../common/state";
import { actions } from "../state";

type Props = {};

export const Filters = ({
  currentFilter,
  toggleFilter,
}: Props & StateProps) => {
  const handleFilterChange = () => {
    const newFilter = currentFilter === "starred" ? "all" : "starred";
    toggleFilter(newFilter);
  };
  return (
    <>
      <div className="flex justify-end">
        <div className="flex items-center w-4/12 pl-4 border border-gray-200 rounded dark:border-gray-700">
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
      </div>
    </>
  );
};

const connector = connect(
  (state: RootState) => ({ currentFilter: state.repos.filter }),
  {
    toggleFilter: actions.setFilter,
  }
);
type StateProps = ConnectedProps<typeof connector>;

export default connector(Filters);
