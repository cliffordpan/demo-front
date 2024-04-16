import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Store } from '@ngrx/store';
import { Auths, Profiles } from '../reducers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models';
import { Observable } from 'rxjs';
import { Confirm } from '../comfirm.decorator';
import { MatDialog } from '@angular/material/dialog';
import { PasswordComponent } from '../password/password.component';
import { Router } from '@angular/router';

@Component({
	selector: 'hc-profile',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	private store$ = inject(Store);
	private dialog = inject(MatDialog);
	private router$ = inject(Router);

	private nickname = new FormControl('');
	private firstname = new FormControl('', Validators.required);
	private lastname = new FormControl('');

	form = new FormGroup({
		nickName: this.nickname,
		firstName: this.firstname,
		lastName: this.lastname
	})
	get self(): Observable<Account | null> {
		return this.store$.select(Profiles.selectSelfProfile);
	}


	ngOnInit(): void {
		this.self.subscribe(data => {
			if (data == null) return;
			if (!!data) {
				const { nickName, firstName, lastName } = data;
				this.form.reset({
					nickName,
					firstName,
					lastName
				}!);
			}
		});
	}


	@Confirm("Do you confirm to save {0}?")
	saveProfile(email: string) {
		const { nickName, firstName, lastName } = this.form.value;
		this.store$.dispatch(Profiles.ProfileActions.updateSelf({ profile: { nickName: nickName!, firstName: firstName!, lastName: lastName! } }))
		this.reset();
	}

	reset() {
		this.self.subscribe(data => {
			if (data == null) return;
			if (!!data) {
				const { nickName, firstName, lastName } = data;
				this.form.reset({
					nickName,
					firstName,
					lastName
				}!);
			}
		});
	}

	changePassword(id: number) {
		this.dialog.open(PasswordComponent).afterClosed().subscribe({
			next: (rs) => {
				console.log(rs);
				if (rs) {
					this.store$.dispatch(Auths.AuthActions.logout());
					this.router$.navigateByUrl("");
				}
			}
		})
	}

}

