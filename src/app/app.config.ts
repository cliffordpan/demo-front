import { APP_BOOTSTRAP_LISTENER, ApplicationConfig, ComponentRef, Injector, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, xhrInterceptor } from './auth.interceptor';
import { effects } from './effects';
import { provideRouterStore } from '@ngrx/router-store';
import { DecoratorService } from './decorator.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([
			authInterceptor,
			xhrInterceptor
		])),
		provideAnimations(),
		provideStore(reducers),
		provideEffects(effects),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideRouterStore(),
		{
			provide: APP_BOOTSTRAP_LISTENER, multi: true,
			useFactory: (service: DecoratorService) => {
				return (c: ComponentRef<any>) => { }
			},
			deps: [DecoratorService]
		}

	]
};
