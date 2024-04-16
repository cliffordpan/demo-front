import { Injectable } from '@angular/core';

const TOKEN_KEY = "access_token";

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	constructor() { }

	saveToken(token: string) {
		sessionStorage.setItem(TOKEN_KEY, token);
	}

	getToken(): string | null {
		return sessionStorage.getItem(TOKEN_KEY);
	}

	removeToken() {
		sessionStorage.removeItem(TOKEN_KEY);
	}

	isExpiried() {
		const token = this.getToken();
		if (!!token) {
			const claims = this.decode(token);
			return Date.now() > (claims.exp * 1000);
		}
		return true;
	}

	private decode(token: string) {
		const components = token.split('.');
		const payload = components[1];
		return JSON.parse(atob(payload));
	}
}
