import { Component, ElementRef, HostListener, Inject, ViewChild, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Auths } from '../reducers';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
@Component({
	selector: 'hc-login',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	private store$ = inject(Store);

	@ViewChild("email")
	email!: ElementRef<HTMLInputElement>;

	get error() {
		return this.store$.select(Auths.selectError);
	}

	get isAuth() {
		return this.store$.select(Auths.selectIsAuth);
	}

	form = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	})

	constructor(private ref: MatDialogRef<LoginComponent, boolean>) {

	}

	@HostListener("document:keydown.enter")
	login() {
		if (this.form.valid) {
			const { email, password } = this.form.value;
			this.store$.dispatch(Auths.AuthActions.login({ email: email!, password: password! }));
			this.isAuth.subscribe(b => {
				if (b) {
					this.ref.close(b);
				} else {
					this.form.reset();
					this.email.nativeElement.focus();
				}
			});
		} else {
			// console.log(this.form.errors);
			// this.error.next()
		}
	}
}


