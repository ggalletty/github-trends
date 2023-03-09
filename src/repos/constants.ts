import { Repo } from "./domain/repo";
import { TableColumn } from "./domain/table-column";

export const STARS_STORAGE_KEY = `starredRepos`;

export const TABLE_COLUMNS_CONFIG: TableColumn[] = [
  { id: "name", label: "Name", prop: "name" },
  { id: "language", label: "Language", prop: "language" },
  { id: "stars", label: "Stars", prop: "stars_count" },
  { id: "created", label: "Creation date", prop: "created_at" },
  { id: "links", label: "Links", prop: null },
];
