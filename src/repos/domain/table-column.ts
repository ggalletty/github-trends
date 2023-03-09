import { Repo } from "./repo";

export type TableColumn = {
  id: "name" | "language" | "stars" | "created" | "links";
  label: string;
  prop: keyof Repo | null;
};
