import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { Account, Product } from '../models';
import { ShoppingCartService } from '../shopping-cart.service';
import { Store } from '@ngrx/store';
import { Profiles } from '../reducers';

@Component({
	selector: 'hc-product-details',
	standalone: true,
	imports: [SharedModule, RouterLink],
	templateUrl: './product-details.component.html',
	styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
	private cart$ = inject(ShoppingCartService);
	private store$ = inject(Store);

	get self() {
		return this.store$.select<Account | null>(Profiles.selectSelfProfile);
	}

	get product(): Observable<Product> {
		return this.state.data.pipe(map(data => data["product"]));
	}

	constructor(private state: ActivatedRoute) {
	}

	addCart(pid: number) {
		this.cart$.addCart(pid);
	}
}
