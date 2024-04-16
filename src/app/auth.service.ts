import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from '../token.service';

export interface TokenBundle {
	accessToken: string
	tokenId: string
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http$: HttpClient = inject(HttpClient);
	private token$ = inject(TokenService);

	authToken(username: string, password: string) {
		return this.http$.post<TokenBundle>('/auth/token', {}, {
			headers: {
				Authorization: `Basic ${btoa(username + ':' + password)}`
			}
		});
	}

	logout() {
		return this.http$.get<any>('/auth/clear');
	}

	refresh() {
		return this.http$.post<TokenBundle>('/auth/refresh', {});
	}

}
