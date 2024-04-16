import { createActionGroup, createReducer, createSelector, emptyProps, on, props } from "@ngrx/store";
import { AppState } from ".";

export const AuthActions = createActionGroup({
	source: 'Auth API',
	events: {
		'Login': props<{ email: string; password: string }>(),
		'Logout': emptyProps(),
		'Logged In': props<{ email: string; token: string }>(),
		'Logged Out': emptyProps(),
		'Login Failed': props<{ message: string }>(),
		'Token Refresh': emptyProps(),
	}
})


export interface AuthState {
	auth: boolean
	token: string | null
	email: string | null
	error: string | null
}

export const initialState: AuthState = {
	auth: false,
	token: null,
	email: null,
	error: null
}

export const reducer = createReducer(
	initialState,
	on(AuthActions.login, state => ({ ...state, auth: false, token: null, email: null, error: null })),
	on(AuthActions.loggedIn, (state, { email, token }) => ({ ...state, auth: true, email, token, error: null })),
	on(AuthActions.loginFailed, (state, { message }) => ({ ...state, auth: false, email: null, token: null, error: message })),
	on(AuthActions.loggedOut, (_) => (initialState)),
	on(AuthActions.tokenRefresh, state => ({ ...state })),
);


export const selectAuth = (state: AppState) => state.auth;
export const selectIsAuth = createSelector(
	selectAuth, (auth) => auth.auth
);

export const selectError = createSelector(
	selectAuth, (auth) => auth.error
);