import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SystemService {

	constructor(private http$: HttpClient) { }

	resetDB(): Observable<void> {
		return this.http$.get<void>('/api/server/db/reset');
	}
}
