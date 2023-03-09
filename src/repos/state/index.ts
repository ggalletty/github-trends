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

type RepoState = {
  loading: boolean;
  repos: EntityState<Repo>;
  starred: number[];
};

const slice = createSlice({
  name: "repos",
  initialState: {
    loading: false,
    repos: repoAdapter.getInitialState(),
    starred: localRatingServiceFactory().getStarredItems(),
  } as RepoState,
  reducers: {
    star: (state, action: PayloadAction<number>) => {
      state.starred.push(action.payload);
    },
    unstar: (state, action: PayloadAction<number>) => {
      state.starred.splice(state.starred.indexOf(action.payload), 1);
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

export const selectors = {
  repos: repoAdapter.getSelectors<RootState>((state) => state.repos.repos),
};

export const thunks = {
  fetchFromDate: createAsyncThunk(`repos/fetchFromDate`, (fromDate: Date) =>
    githubRepoFactory().getTrendingRepos(fromDate)
  ),
};
