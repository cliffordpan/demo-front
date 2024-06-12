import { Component, OnInit, inject } from '@angular/core';
import { TicketService } from '../ticket.service';
import { SharedModule } from '../shared/shared.module';
import { CdkTableModule } from '@angular/cdk/table';
import { Ticket } from '../models/ticket.model';
import { ArrayDataSource, CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
	selector: 'hc-tickets',
	standalone: true,
	imports: [SharedModule, CdkTableModule],
	templateUrl: './tickets.component.html',
	styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {
	private ticket$ = inject(TicketService);
	// private _tickets = new BehaviorSubject<Ticket[]>([]);
	private _ticketDS = new ArrayDataSource([{ title: 'ttt', description: 'bbbb' }]);
	get tickets(): DataSource<Ticket> {
		return this._ticketDS;
	}


	ngOnInit(): void {
	}

}


class TestDS implements DataSource<Ticket> {
	data = new BehaviorSubject<readonly Ticket[]>([{ title: 'ttt', description: 'bbbb' }])

	connect(collectionViewer: CollectionViewer): Observable<readonly Ticket[]> {
		return this.data;
	}

	disconnect(collectionViewer: CollectionViewer): void {

	}
}

