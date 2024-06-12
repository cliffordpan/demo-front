

import { Injectable } from '@angular/core';
import { Actions, EffectNotification, OnRunEffects, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, exhaustMap, map, of, switchMap, takeUntil, tap, throwIfEmpty, zip } from 'rxjs';
import { Accounts, AppState, Auths, Profiles } from '../reducers';
import { AccountService } from '../account.service';
import { Account } from '../models';
import { Store } from '@ngrx/store';

@Injectable()
export class AccountEffects implements OnRunEffects {

	getSelf = createEffect(() => this.actions$.pipe(
		ofType(Profiles.ProfileActions.getSelf),
		switchMap(({ email }) => this.account$.getSelf().pipe(
			map(profile => Profiles.ProfileActions.gotSelf({ profile }))
		))
	));

	updateProfile = createEffect(() => this.actions$.pipe(
		ofType(Profiles.ProfileActions.updateSelf),
		switchMap(({ profile }) => zip(this.store$.select<Account | null | undefined>(Profiles.ProfileSelectors.selectSelfProfile), of(profile))),
		map(([p1, p2]) => ({ ...p1, ...p2 })),
		switchMap(profile => this.account$.updateAccount(profile)),
		map(profile => Profiles.ProfileActions.gotSelf({ profile }))
	));

	loadAccounts = createEffect(() => this.actions$.pipe(
		ofType(Accounts.BaseAccountActions.loadAccounts),
		switchMap(() => this.account$.listAllBaseInfo()),
		map((accounts) => Accounts.BaseAccountActions.loadedAccounts({ accounts }))
	));

	constructor(private actions$: Actions, private account$: AccountService, private store$: Store<AppState>) { }

	ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
		return this.actions$.pipe(
			ofType(Auths.AuthActions.loggedIn),
			exhaustMap(() => resolvedEffects$.pipe(
				takeUntil(this.actions$.pipe(ofType(Auths.AuthActions.loggedOut)))
			))
		);
	}
}
