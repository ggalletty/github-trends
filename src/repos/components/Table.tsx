import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../common/state";
import { TABLE_COLUMNS_CONFIG } from "../constants";
import { actions, selectors, thunks } from "../state";
import Filters from "./Filters";
import TableRow from "./TableRow";

/** Amount of milliseconds in a week */
const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

type Props = StateProps;

export const Table: React.FC<Props> = ({ fetchRepos, loading, repoList }) => {
  useEffect(() => {
    const fromDate = new Date(Date.now() - WEEK_IN_MS);
    const req = fetchRepos(fromDate);

    return () => {
      req.abort();
    };
  }, []);

  return (
    <div className="relative m-10">
      <div className="rounded-xl mt-10 overflow-auto">
        <table
          className="border-collapse table-fixed w-full text-sm"
          data-testid="repo-table"
        >
          <thead>
            <tr data-testid="repo-table-headers">
              {TABLE_COLUMNS_CONFIG.map(({ id, label }) => (
                <th
                  key={id}
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <Loading />}
            {loading || repoList.map(({ id }) => <TableRow key={id} id={id} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Loading = () => (
  <tr>
    {TABLE_COLUMNS_CONFIG.map(({ id }) => (
      <td key={id}>
        <div className="animate-pulse flex-1 mt-5 mx-2 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </td>
    ))}
  </tr>
);

const connector = connect(
  (state: RootState) => ({
    loading: state.repos.loading,
    repoList: selectors.selectFiltered(state),
  }),
  // passing dispatch props as object since the fn form was giving me type issues
  {
    fetchRepos: thunks.fetchFromDate,
    setFilter: actions.setFilter,
  }
);
type StateProps = ConnectedProps<typeof connector>;

export default connector(Table);
