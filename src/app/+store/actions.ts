import { createAction, props } from '@ngrx/store';
import { IMainState } from '.';

const actioTypes = {
  login: 'LOGIN',
  logout: 'LOGOUT',
};

export const login = createAction(
  actioTypes.login,
  props<{ userData: IMainState }>()
);
export const logout = createAction(actioTypes.logout);
