import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenService = inject(TokenService);
	if (req.url.endsWith("/auth/token")) {
		return next(req);
	} else if (req.url.endsWith('/auth/refresh')) {
		return next(req);
	} else if (tokenService.getToken() != null && tokenService.getToken()!!.length > 0) {
		const mReq = req.clone({
			headers: req.headers.set('Authorization', `Bearer ${tokenService.getToken()}`)
		});
		return next(mReq);
	}
	return next(req);
};

export const xhrInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
	const mReq = req.clone({
		headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
	});
	return next(mReq);
}


// export const refreshTokenInteceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
// 	const router$ = inject(Router);
// 	const auth$ = inject(AuthService);
// 	const token$ = inject(TokenService);
// 	return next(req).pipe(catchError(error => {
// 		if (error instanceof HttpErrorResponse && (error.status == 401) && !req.url.includes("/auth")) {
// 			token$.removeToken()
// 			return auth$.refresh().pipe(switchMap(() => {
// 				const mReq = req.clone({
// 					headers: req.headers.set('Authorization', `Bearer ${token$.getToken()}`)
// 				});
// 				return next(mReq);
// 			}), catchError(err => {
// 				auth$.self.next(null);
// 				router$.navigateByUrl("/login")
// 				return throwError(() => err);
// 			}));
// 		}
// 		return throwError(() => error);
// 	}));
// }