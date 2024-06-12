import { Injectable } from '@angular/core';
import { Ticket } from './models/ticket.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TicketService {

	constructor(private http$: HttpClient) { }

	list(): Observable<readonly Ticket[]> {
		return this.http$.get<readonly Ticket[]>('/api/tickets');
	}

	createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
		return this.http$.post<Ticket>('/api/tickets', ticket);
	}

	updateTicket(id: number, ticket: Partial<Ticket>): Observable<Ticket> {
		return this.http$.put<Ticket>(`/api/tickets/${id}`, ticket);
	}

	assignTicket(id: number, eid: number): Observable<Ticket> {
		return this.http$.post<Ticket>(`/api/tickets/${id}?employeeId=${eid}`, null);
	}

	closeTicket(id: number): Observable<Ticket> {
		return this.http$.post<Ticket>(`/api/tickets/${id}/close`, null);
	}
}
