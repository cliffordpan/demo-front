export interface DomainEntity {
	readonly id: number
}

export interface Pageable {
	pageNumber: number
	pageSize: number
	sort: Sort
	offset: number
	unpaged: boolean
	paged: boolean
}

export class PageRequest implements Partial<Pageable> {
	constructor(public pageNumber: number, public pageSize: number = 20, public sort: Sort = {}) { }
}

export interface Sort {

}

export interface Page<T extends DomainEntity> {
	content: T[]
	last: boolean
	totalElements: number
	totalPages: number
	size: number
	number: number
	numberOfElements: number
}