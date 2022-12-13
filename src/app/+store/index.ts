import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { autoLogin, login, logout } from './actions';

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
    localStorage.setItem(
      'user',
      JSON.stringify({ ...userData, isLoggedIn: true })
    );
    return { ...userData, isLoggedIn: true };
  }),

  on(logout, (state) => {
    localStorage.removeItem('user');
    return mainInitialState;
  }),

  on(autoLogin, (state) => {
    const user = localStorage.getItem('user');
    if (user) {
      return { ...JSON.parse(user) };
    }
  })
);

export const reducers: ActionReducerMap<IAppState> = {
  main: mainReducer,
};
