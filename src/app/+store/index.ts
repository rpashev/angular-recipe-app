import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import {
  addToAuthored,
  addToFavorites,
  autoLogin,
  login,
  logout,
  removeFromAuthored,
  removeFromFavorites,
  updateUserLocalStorage,
} from './actions';

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
  }),

  on(updateUserLocalStorage, (state) => {
    localStorage.setItem('user', JSON.stringify(state));
    return state;
  }),

  on(removeFromFavorites, (state, { id }) => {
    return {
      ...state,
      favorites: state.favorites.filter((r) => r != id),
    };
  }),

  on(removeFromAuthored, (state, { id }) => {
    return {
      ...state,
      authored: state.authored.filter((r) => r != id),
    };
  }),

  on(addToFavorites, (state, { id }) => {
    return {
      ...state,
      favorites: [...state.favorites, id],
    };
  }),

  on(addToAuthored, (state, { id }) => {
    return {
      ...state,
      authored: [...state.authored, id],
    };
  })
);

export const reducers: ActionReducerMap<IAppState> = {
  main: mainReducer,
};
