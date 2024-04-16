import { DomainEntity } from "./page.model"

export interface Product extends DomainEntity {
	name: string
	description: string
	price?: number
	unitPrice?: number
	category?: string
	platform?: string
}

export interface Cart {
	[pid: string]: number
}

