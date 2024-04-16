import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Page, PageRequest } from './models/page.model';
import { Observable } from 'rxjs';
import { Product } from './models';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	private http$ = inject(HttpClient)

	constructor() { }

	getProducts(criteria: string = "", pageable: PageRequest = new PageRequest(0)): Observable<Page<Product>> {
		return this.http$.get<Page<Product>>('/api/products', {
			params: new HttpParams()
				.set("search", criteria)
				.set("page", pageable.pageNumber)
				.set("size", pageable.pageSize)
		});
	}

	getProduct(id: number): Observable<Product> {
		return this.http$.get<Product>('/api/products/' + id);
	}
}
