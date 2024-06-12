import { Component, Inject, OnInit, inject } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';

@Component({
	selector: 'hc-new-ticket',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './new-ticket.component.html',
	styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent implements OnInit {
	private ticket$ = inject(TicketService);

	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required])
	})

	constructor(@Inject(MAT_DIALOG_DATA) public ticket: Ticket | null | undefined, private ref: MatDialogRef<NewTicketComponent>) {

	}

	ngOnInit(): void {
		if (!!this.ticket) {
			this.form.reset(this.ticket);
		}
	}


	saveTicket() {
		if (this.form.valid) {
			const { title, description } = this.form.value;
			if (!!this.ticket) { //update ticket
				this.ticket$.updateTicket(this.ticket!.id!, { title: title!, description: description! });
			} else {
				this.ticket$.createTicket({ title: title!, description: description! }).subscribe({
					next: () => this.ref.close()
				});
			}
		}
	}
}
