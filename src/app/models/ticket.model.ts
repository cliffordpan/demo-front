export interface Ticket {
	readonly id?: number
	readonly client?: number
	readonly assigned?: number
	readonly modifiedBy?: number
	title: string
	description: string
	readonly createdDate?: string
	readonly updatedDate?: string
	readonly closedDate?: string
}