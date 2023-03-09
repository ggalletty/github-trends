import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../common/state";
import { TABLE_COLUMNS_CONFIG } from "../constants";
import { Repo } from "../domain/repo";
import { TableColumn } from "../domain/table-column";
import { actions, selectors } from "../state";

type Props = { id: number };

export const TableRow: React.FC<Props & StateProps> = ({
  isStarred,
  repo,
  starRepo,
  unstarRepo,
}) => {
  return (
    <tr>
      {TABLE_COLUMNS_CONFIG.map((col) => (
        <td
          key={col.id}
          className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          <RowContent
            col={col}
            isStarred={isStarred}
            repo={repo}
            toggleStar={isStarred ? unstarRepo : starRepo}
          />
        </td>
      ))}
    </tr>
  );
};

const connector = connect(
  (state: RootState, props: Props) => ({
    repo: selectors.selectById(state, props.id),
    isStarred: selectors.isStarred(state, props.id),
  }),
  {
    starRepo: actions.starRepo,
    unstarRepo: actions.unstarRepo,
  }
);
type StateProps = ConnectedProps<typeof connector>;

export default connector(TableRow);

type RowContentProps = {
  col: TableColumn;
  repo: Repo | undefined;
  isStarred: boolean;
  toggleStar: (repo: Repo) => void;
};
const RowContent = ({ col, isStarred, repo, toggleStar }: RowContentProps) => {
  if (!repo) return null;
  switch (col.id) {
    case "created":
      return <>{new Date(repo.created_at).toLocaleString()}</>;
    case "language":
      return <>{repo.language || "N/A"}</>;
    case "links":
      return (
        <>
          <a href={repo.url}>Go</a>
          <button onClick={() => toggleStar(repo)} className="ml-2">
            {isStarred ? "Unstar" : "Star"}
          </button>
        </>
      );
    default:
      return <>{col.prop && repo[col.prop]}</>;
  }
};
