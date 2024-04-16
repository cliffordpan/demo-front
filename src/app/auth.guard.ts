import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auths } from './reducers';
import { catchError, filter, map, mergeMap, of, retry, tap, throwError, timeout } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

export const authGuard: CanActivateFn = (route, state) => {

	const store = inject(Store);
	const dialog = inject(MatDialog);
	const router = inject(Router);
	console.log('Auth Guard', route);
	return of(1).pipe(
		mergeMap(_ => store.select(Auths.selectIsAuth)),
		filter(f => f),
		timeout({
			each: 3000,
			with: () => throwError(() => 'Not Auth')
		}),
		catchError(e => {
			const ref = dialog.open<LoginComponent, any, boolean>(LoginComponent);
			ref.afterOpened().subscribe(() => store.dispatch(Auths.AuthActions.loginFailed({ message: e })));
			return ref.afterClosed().pipe(
				tap(b => {
					if (!b) {
						router.navigateByUrl('/home');
					}
				}),
				map(b => !!b)
			)
		}
		)
	);
};
