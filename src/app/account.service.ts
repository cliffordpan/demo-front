import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, BaseAccount } from './models';
import { Confirm } from './comfirm.decorator';



@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private http$ = inject(HttpClient);

	constructor() { }

	listAllBaseInfo(): Observable<BaseAccount[]> {
		return this.http$.get<BaseAccount[]>('/api/accounts');
	}

	getSelf(): Observable<Account> {
		return this.http$.get<Account>('/api/self');
	}

	isPasswordMatch(password: string): Observable<boolean> {
		return this.http$.post<boolean>("/api/self/testPassword", { password });
	}

	updatePassword(old: string, password: string): Observable<Account> {
		return this.http$.post<Account>("/api/self/updatePassword", {
			old, password
		});
	}

	updateAccount(account: Partial<Account>): Observable<Account> {
		return this.http$.patch<Account>("/api/self/updateAccount", account);
	}
}
