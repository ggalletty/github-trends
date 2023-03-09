import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../common/state";
import { Repo } from "../domain/repo";
import { githubRepoFactory } from "../infra/github-repo-service";
import { localRatingServiceFactory } from "../infra/local-rating-service";

const repoAdapter = createEntityAdapter<Repo>();

// We could also store an array of IDs, which was the initial approach
// but given that the list can and will change, it's better to store the objects
const starredAdapter = createEntityAdapter<Repo>();

type RepoState = {
  loading: boolean;
  filter: "all" | "starred";
  repos: EntityState<Repo>;
  starred: EntityState<Repo>;
};

const getStoredStarredRepos = (): EntityState<Repo> => {
  const storedReposMap = localRatingServiceFactory().getStoredMap();
  return {
    entities: storedReposMap,
    ids: Object.keys(storedReposMap).map(Number),
  };
};

const slice = createSlice({
  name: "repos",
  initialState: {
    loading: false,
    filter: "all",
    repos: repoAdapter.getInitialState(),
    starred: getStoredStarredRepos(),
  } as RepoState,
  reducers: {
    setFilter: (state, action: PayloadAction<RepoState["filter"]>) => {
      state.filter = action.payload;
    },
    starRepo: (state, action: PayloadAction<Repo>) => {
      starredAdapter.addOne(state.starred, action.payload);
    },
    unstarRepo: (state, action: PayloadAction<Repo>) => {
      starredAdapter.removeOne(
        state.starred,
        starredAdapter.selectId(action.payload)
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(thunks.fetchFromDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(thunks.fetchFromDate.fulfilled, (state, action) => {
        state.loading = false;
        repoAdapter.upsertMany(state.repos, action.payload);
      }),
});

// doesn't necessarily need to be the same as `slice.name`
export const key = "repos";
export const { actions, reducer } = slice;

const repoSelectors = repoAdapter.getSelectors<RootState>(
  (state) => state.repos.repos
);

const starredSelectors = starredAdapter.getSelectors<RootState>(
  (state) => state.repos.starred
);

export const selectors = {
  isStarred: (state: RootState, repoId: number) =>
    starredSelectors.selectIds(state).includes(repoId),
  selectById: repoSelectors.selectById,
  selectAll: repoSelectors.selectAll,
  selectStarred: starredSelectors.selectAll,
  selectFiltered: (state: RootState) => {
    switch (state.repos.filter) {
      case "starred":
        return starredSelectors.selectAll(state);
      default:
        return repoSelectors.selectAll(state);
    }
  },
};

export const thunks = {
  fetchFromDate: createAsyncThunk(`repos/fetchFromDate`, (fromDate: Date) =>
    githubRepoFactory().getTrendingRepos(fromDate)
  ),
};
