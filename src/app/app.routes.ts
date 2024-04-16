import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { productDetailsResolver } from './product-details.resolver';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{
		path: 'products',
		children: [
			{ path: '', component: ProductsComponent },
			{
				path: ':id', component: ProductDetailsComponent, resolve: {
					product: productDetailsResolver
				}
			}
		]
	},
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] }
];
