import { Injectable, inject } from '@angular/core';
import { Cart, LocalStorage, Product } from './models';
import { Observable, catchError, concatAll, concatMap, distinctUntilChanged, exhaustMap, filter, map, mergeAll, of, reduce, tap } from 'rxjs';
import { ProductService } from './product.service';

const CART_KEY = "#### SHOPPING_CART ####";

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartService {
	private products = inject(ProductService);

	@LocalStorage(CART_KEY)
	private cart!: Cart;
	constructor() {
		if (!this.cart) this.cart = {};
	}

	addCart(pid: number, quantity: number = 1) {
		if (quantity < 1) throw new Error('Invalid quantity');
		this.products.getProduct(pid).subscribe(_ => {
			if (!this.cart) this.cart = {};
			if (!!this.cart[pid]) quantity += this.cart[pid]!;
			this.cart[pid] = quantity;
		});
	}

	remove(pid: number) {
		delete this.cart[pid];
	}

	totalQuantity(): Observable<string | null> {
		if (!this.cart) {
			this.clear();
			return of(null);
		}
		const total = Object.values(this.cart).reduce((a, b) => (a + b), 0);
		return of(total > 9 ? '9+' : (!!total ? `${total}` : null));
	}

	clear() {
		this.cart = {};
	}
}
