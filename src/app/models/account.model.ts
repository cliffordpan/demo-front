import { DomainEntity } from "./page.model"

export interface BaseAccount extends DomainEntity {
	type: AccountType
	firstName?: string
	lastName?: string
}

export interface Account extends BaseAccount {
	email: string
	password?: string
	nickName?: string
	billingAddress?: Address
	shippingAddress?: Address
	mailingAddress?: Address
	readonly roles?: Role[]
}

export enum Role {
	ADMIN = 'ADMIN',
	SUPPORT = 'SUPPORT',
	INVENTORY = 'INVENTORY',
	CLIENT = 'CLIENT'
}

export interface Address {
	line1: string,
	line2?: string | null
	unit?: string
	city?: string
	region?: string
	country: string
	postal: string
}

export enum AccountType {
	CLIENT = 'CLIENT',
	VENDOR = 'VENDOR',
	EMPLOYEE = 'EMPLOYEE'
}
