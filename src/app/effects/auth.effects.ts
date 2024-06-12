import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { AuthService, TokenBundle } from '../auth.service';
import { Accounts, Auths, Profiles } from '../reducers'
import { catchError, concatMap, distinctUntilChanged, iif, interval, map, mergeMap, of, pipe, switchMap, takeUntil, takeWhile, tap, zipWith } from 'rxjs';
import { Router } from '@angular/router';
import { Action, createAction } from '@ngrx/store';
import { TokenService } from '../../token.service';

const AppEffect = createAction('[App Effect] Check loop');

@Injectable()
export class AuthEffects implements OnInitEffects {

	appInit = createEffect(() => this.actions$.pipe(
		ofType(AppEffect),
		switchMap(() => interval(1000).pipe(
			map(_ => this.token$.isExpiried()),
			distinctUntilChanged(),
		)),
		map(() => Auths.AuthActions.tokenRefresh()),
	));

	refresh = createEffect(() => this.actions$.pipe(
		ofType(Auths.AuthActions.tokenRefresh),
		switchMap(() => this.auth$.refresh()),
		mergeMap(tokens => {
			const { accessToken } = tokens;
			const [_, body] = accessToken.split('.');
			const { sub } = JSON.parse(atob(body));
			return of(Auths.AuthActions.loggedIn({ email: sub, token: accessToken }));
		}),
		catchError(() => of(Auths.AuthActions.loggedOut()))
	));

	login = createEffect(() => this.actions$.pipe(
		ofType(Auths.AuthActions.login),
		switchMap(({ email, password }) =>
			this.auth$.authToken(email, password)
				.pipe(
					map(tokens => Auths.AuthActions.loggedIn({ email, token: tokens.accessToken })),
					catchError(() => of(Auths.AuthActions.loginFailed({ message: 'Incorrect email/password' })))
				)
		)
	));

	logout = createEffect(() => this.actions$.pipe(
		ofType(Auths.AuthActions.logout),
		switchMap(() => this.auth$.logout().pipe(
			map(() => Auths.AuthActions.loggedOut())
		))
	));

	loggedIn = createEffect(() => this.actions$.pipe(
		ofType(Auths.AuthActions.loggedIn),
		tap(({ token }) => {
			if (this.token$.isExpiried()) {
				this.token$.saveToken(token);
			}
		}),
		map(({ email }) => Profiles.ProfileActions.getSelf({ email }))
	));

	loggedInLoadAccounts = createEffect(() => this.actions$.pipe(
		ofType(Auths.AuthActions.loggedIn),
		map(() => Accounts.BaseAccountActions.loadAccounts())
	))

	loggedOut = createEffect(() => this.actions$.pipe(
		ofType(Auths.AuthActions.loggedOut),
		tap(() => {
			this.token$.removeToken();
		}),
		map(() => Profiles.ProfileActions.clear())
	))


	ngrxOnInitEffects(): Action {
		return AppEffect();
	}

	constructor(private actions$: Actions, private auth$: AuthService, private router: Router, private token$: TokenService) { }
}
