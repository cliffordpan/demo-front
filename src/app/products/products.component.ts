import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models';
import { SharedModule } from '../shared/shared.module';
import { TruncatePipe } from '../truncate.pipe';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'hc-products',
	standalone: true,
	imports: [SharedModule, FormsModule, MatListModule, TruncatePipe, RouterLink],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
	private service$ = inject(ProductService);

	products!: Product[];

	private searchText$ = new Subject<string>();
	private subscription!: Subscription

	ngOnInit(): void {
		this.subscription = this.searchText$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			switchMap(criteria => this.service$.getProducts(criteria))
		).subscribe(page => {
			this.products = page.content;
		});
		this.search();
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	search(criteria: string = '') {
		this.searchText$.next(criteria);
	}

	getValue(event: Event): string {
		return (event.target as HTMLInputElement).value;
	}
}
