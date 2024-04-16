import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Systems } from '../reducers';
import { switchMap } from 'rxjs';
import { SystemService } from '../system.service';



@Injectable()
export class AppEffects {


	resetDB = createEffect(() => this.actions$.pipe(
		ofType(Systems.SystemActions.resetDB),
		switchMap(() => this.system$.resetDB())
	), { dispatch: false });

	constructor(private actions$: Actions, private system$: SystemService) { }
}
