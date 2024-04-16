import { isDevMode } from '@angular/core';
import * as Auths from './auth-state';
export * as Auths from './auth-state';
import * as Profiles from './profile';
export * as Profiles from './profile';
export * as Systems from './system';
import {
	ActionReducerMap,
	MetaReducer,
	createAction
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { RouterState } from '@angular/router';


export interface AppState {
	auth: Auths.AuthState,
	profile: Profiles.ProfileState,
	router: RouterState
}

export const reducers: ActionReducerMap<AppState> = {
	auth: Auths.reducer,
	profile: Profiles.reducer,
	router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

