import { createActionGroup, emptyProps } from "@ngrx/store";

export const SystemActions = createActionGroup({
	source: 'System',
	events: {
		'Reset DB': emptyProps(),
		'Get Status': emptyProps()
	}
})