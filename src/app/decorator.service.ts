import { Injectable, Injector, ProviderToken, inject, runInInjectionContext } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DecoratorService {

	private static _injector?: Injector

	static get injector() {
		// if (!DecoratorService._injector) throw new Error('DecoratorService not initialized');
		return DecoratorService._injector!;
	}

	constructor(private _injector: Injector) {
		DecoratorService._injector = _injector;
	}


	public static inject<T>(token: ProviderToken<T>): T {
		if (!DecoratorService._injector) throw new Error('DecoratorService not initialized');
		return DecoratorService._injector.get(token)
	}
}
