import { createAction, props } from '@ngrx/store';
import { IMainState } from '.';

const actionTypes = {
  login: 'LOGIN',
  logout: 'LOGOUT',
  autoLogin: 'AUTO_LOGIN',
  updateUserLocalStorage: 'UPDATE_USER_LOCAL_STORAGE',
  removeFromFavorites: 'REMOVE_FROM_FAVORITES',
  removeFromAuthored: 'REMOVE_FROM_AUTHORED',
  addToFavorites: 'ADD_TO_FAVORITES',
  addToAuthored: 'ADD_TO_AUTHORED',
};

export const login = createAction(
  actionTypes.login,
  props<{ userData: IMainState }>()
);

export const logout = createAction(actionTypes.logout);

export const autoLogin = createAction(actionTypes.autoLogin);

export const updateUserLocalStorage = createAction(
  actionTypes.updateUserLocalStorage
);

export const removeFromFavorites = createAction(
  actionTypes.removeFromFavorites,
  props<{ id: string }>()
);

export const removeFromAuthored = createAction(
  actionTypes.removeFromAuthored,
  props<{ id: string }>()
);

export const addToFavorites = createAction(
  actionTypes.addToFavorites,
  props<{ id: string }>()
);

export const addToAuthored = createAction(
  actionTypes.addToAuthored,
  props<{ id: string }>()
);
