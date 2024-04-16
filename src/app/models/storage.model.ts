import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import 'reflect-metadata';

interface StorageEntity {
	type: string
	value: any
}

export const LocalStorage: (storage: string) => PropertyDecorator = (storage: string) => {
	return (t, key) => {
		const changeHandler = {
			set(target: object, prop: PropertyKey, value: any, receiver?: any): boolean {
				const rs = Reflect.set(target, prop, value, receiver);
				if (rs) {
					setter(target);
				}
				return rs;
			},
			get(target: object, prop: PropertyKey, receiver?: any) {
				let ret = Reflect.get(target, prop, receiver);
				if (typeof ret === "function") {
					ret = ret.bind(target);
				}
				return ret;
			}
		}

		const getter = function () {
			const v = localStorage.getItem(storage);
			if (!v) return undefined;
			const entity = JSON.parse(v) as StorageEntity;
			if (entity.type === 'map') return new Proxy(new Map(Object.entries(entity.value)), changeHandler);
			if (entity.type === 'set') return new Proxy(new Set(entity.value), changeHandler);
			return new Proxy(entity.value, changeHandler);
		};

		const setter = function (newValue: any) {
			if (!newValue) return;
			localStorage.setItem(storage, JSON.stringify({
				type: (newValue instanceof Map) ? 'map' : (newValue instanceof Set) ? 'set' : typeof (newValue),
				value: newValue
			}));
		};

		Object.defineProperty(t, key, {
			get: getter,
			set: setter
		})
	};
}

