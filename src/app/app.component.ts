import { Component, EventEmitter, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Auths, Profiles, Systems } from './reducers';
import { Subscription, firstValueFrom, map } from 'rxjs';
import { Account, AccountType } from './models';
import { ShoppingCartService } from './shopping-cart.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

@Component({
	selector: 'hc-root',
	standalone: true,
	imports: [SharedModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
	private cartService = inject(ShoppingCartService);
	private titleService = inject(Title);
	private store$ = inject(Store);
	private router = inject(Router);
	private dialog = inject(MatDialog);

	private _subscription?: Subscription

	private _ticketDialogOpened = false;

	get isTicketOpened() {
		return this._ticketDialogOpened;
	}

	get isAuth() {
		return this.store$.select<boolean>(Auths.selectIsAuth);
	}

	get self() {
		return this.store$.select<Account | null | undefined>(Profiles.ProfileSelectors.selectSelfProfile);
	}

	get cartTotal() {
		return this.cartService.totalQuantity();
	}

	get name() {
		return this.self.pipe(map(profile => {
			if (!!profile) {
				const type = profile.type
				switch (type) {
					case AccountType.CLIENT:
						if (!!profile.nickName) {
							return profile.nickName;
						} else {
							return `${profile.firstName} ${profile.lastName}`.trim();
						}
					case AccountType.EMPLOYEE:
						return `${profile.firstName} ${profile.lastName}`.trim();
				}
			}
			return "NA";
		}));
	}

	get title() {
		return 'Game store demo app';
	}

	resetDB() {
		this.store$.dispatch(Systems.SystemActions.resetDB());
	}

	ngOnInit(): void {
		this.titleService.setTitle(this.title);
	}

	ngOnDestroy(): void {
		this._subscription?.unsubscribe();
	}

	login() {
		this.dialog.open<LoginComponent, any, boolean>(LoginComponent).afterClosed()
			.subscribe();
	}

	logout() {
		this.store$.dispatch(Auths.AuthActions.logout());
		this.isAuth.subscribe(b => {
			if (!b) {
				this.router.navigateByUrl('/home');
			}
		});
	}

	async sendTicket() {
		const isAuth = await firstValueFrom(this.isAuth);
		if (!isAuth) {
			const rs = await firstValueFrom(this.dialog.open<LoginComponent, any, boolean>(LoginComponent).afterClosed());
			if (!rs) return;
		}
		const self = await firstValueFrom(this.self);
		if (self?.type != AccountType.EMPLOYEE) {
			if (!this._ticketDialogOpened) {
				this.openTicket();
			}
		}
	}

	private openTicket(): void {
		const ref = this.dialog.open<NewTicketComponent>(NewTicketComponent, { hasBackdrop: false });
		ref.afterOpened().subscribe({
			complete: () => this._ticketDialogOpened = true
		});

		ref.afterClosed().subscribe({
			complete: () => this._ticketDialogOpened = false
		})
	}
}
