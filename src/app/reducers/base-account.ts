import { Dictionary, EntityState, createEntityAdapter } from "@ngrx/entity";
import { BaseAccount } from "../models";
import { createActionGroup, createReducer, createSelector, emptyProps, on, props } from "@ngrx/store";
import { AppState } from ".";

export const BaseAccountActions = createActionGroup({
	source: 'Base Account Actions',
	events: {
		'Load Accounts': emptyProps(),
		'Loaded Accounts': props<{ accounts: BaseAccount[] }>()
	}
})


export interface State extends EntityState<BaseAccount> {
}

const adapter = createEntityAdapter<BaseAccount>();
const initialState: State = adapter.getInitialState();

export const reducer = createReducer<State>(
	initialState,
	on(BaseAccountActions.loadedAccounts, (state, { accounts }) => adapter.setMany(accounts, state))
)

const selectFeatureState = (state: AppState) => state.account;

export const accountSelectors = adapter.getSelectors();
export const selectById = (id: number) => createSelector(
	adapter.getSelectors().selectEntities,
	(entities: Dictionary<BaseAccount>) => entities[id]
)