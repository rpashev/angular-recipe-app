import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { login, logout } from './actions';

export interface IMainState {
  token: string | null;
  userId: string | null;
  email: string | null;
  firstName: string | null;
  authored: string[];
  favorites: string[];
  isLoggedIn: boolean;
}

interface IAppState {
  main: IMainState;
}

const mainInitialState: IMainState = {
  token: null,
  userId: null,
  email: null,
  firstName: null,
  authored: [],
  favorites: [],
  isLoggedIn: false,
};

const mainReducer = createReducer<IMainState>(
  mainInitialState,
  on(login, (state, { userData }) => {
    return { ...userData, isLoggedIn: true };
  }),
  on(logout, (state) => {
    return mainInitialState;
  })
);

export const reducers: ActionReducerMap<IAppState> = {
  main: mainReducer,
};
