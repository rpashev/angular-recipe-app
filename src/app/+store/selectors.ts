import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMainState } from './index';

const mainSelector = createFeatureSelector<IMainState>('main');

export const getAuthored = createSelector(mainSelector, (s) => s?.authored);
export const getFavorites = createSelector(mainSelector, (s) => s?.favorites);
export const getToken = createSelector(mainSelector, (s) => s?.token);
export const getFirstName = createSelector(mainSelector, (s) => s?.firstName);
export const getEmail = createSelector(mainSelector, (s) => s?.email);
export const getUserId = createSelector(mainSelector, (s) => s?.userId);
export const getisLoggedIn = createSelector(mainSelector, (s) => s?.isLoggedIn);
