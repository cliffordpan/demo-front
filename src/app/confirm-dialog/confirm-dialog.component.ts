import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'hc-confirm-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButton, MatIcon],
	templateUrl: './confirm-dialog.component.html',
	styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

	constructor(@Inject(MAT_DIALOG_DATA) public message: string) {
	}

}
