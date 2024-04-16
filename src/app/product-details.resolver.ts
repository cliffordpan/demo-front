import { ResolveFn, Router } from '@angular/router';
import { Product } from './models';
import { EMPTY } from 'rxjs';
import { inject } from '@angular/core';
import { ProductService } from './product.service';

export const productDetailsResolver: ResolveFn<Product> = (route, state) => {
	const id = route.params["id"];
	const router = inject(Router);
	const service = inject(ProductService);
	if (!id) {
		router.navigate(['/products']);
		return EMPTY;
	}
	return service.getProduct(id);
};
