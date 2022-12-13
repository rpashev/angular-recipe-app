import { createAction, props } from '@ngrx/store';
import { IMainState } from '.';

const actioTypes = {
  login: 'LOGIN',
  logout: 'LOGOUT',
  autoLogin: 'AUTO_LOGIN',
};

export const login = createAction(
  actioTypes.login,
  props<{ userData: IMainState }>()
);
export const logout = createAction(actioTypes.logout);
export const autoLogin = createAction(actioTypes.autoLogin);
