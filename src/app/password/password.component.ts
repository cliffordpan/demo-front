import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { BehaviorSubject, EMPTY, debounceTime, delay, distinctUntilChanged, first, map, mergeMap, of, switchMap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

const passwordMatch: ValidatorFn = (c: AbstractControl) => {
	if (c instanceof FormGroup) {
		const newPsw = c.controls["n"];
		const cPsw = c.controls["c"];
		if (newPsw.value != cPsw.value) {
			return { "passwordMatch": true }
		}
	}
	return null;
}

const passwordCheck: (service: AccountService) => AsyncValidatorFn = (service: AccountService) => (control: AbstractControl) => {
	return control.valueChanges.pipe(
		debounceTime(500),
		distinctUntilChanged(),
		switchMap(value => service.isPasswordMatch(value)),
		map(b => b ? null : { 'incorrectPassword': true }),
		first()
	)
};

@Component({
	selector: 'hc-password',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './password.component.html',
	styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
	private account$ = inject(AccountService);
	private ref = inject(MatDialogRef<PasswordComponent>)
	error = new BehaviorSubject<string | null>(null);

	form = new FormGroup({
		old: new FormControl("", { updateOn: 'change', asyncValidators: [passwordCheck(this.account$)], validators: [Validators.required] }),
		n: new FormControl("", Validators.required),
		c: new FormControl("", Validators.required)
	}, passwordMatch);

	ngOnInit(): void {
	}

	updataPassword() {
		if (this.form.valid) {
			const { old, n } = this.form.value;
			this.account$.updatePassword(old!, n!).subscribe({
				next: () => this.ref.close(true),
				error: (e) => this.error.next(e.message)
			});
		}
	}
}
