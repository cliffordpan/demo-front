import { ActionReducer, createActionGroup, createReducer, createSelector, emptyProps, on, props } from "@ngrx/store";
import { AppState } from ".";
import { Account } from "../models";
import { Dictionary, EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";


export const ProfileActions = createActionGroup({
	source: 'Profile API',
	events: {
		'Get Self': props<{ email: string }>(),
		'Got Self': props<{ profile: Account }>(),
		'Update Self': props<{ profile: Partial<Account> }>(),
		'Clear': emptyProps()
	}
});

export function selectAccountId(a: Account) {
	return a.id;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>({
	selectId: selectAccountId
})

export interface ProfileState extends EntityState<Account> {
	selectedAccountId: number | null
}

const initialState: ProfileState = adapter.getInitialState({
	selectedAccountId: null
});

export const reducer: ActionReducer<ProfileState> = createReducer<ProfileState>(
	initialState,
	on(ProfileActions.getSelf, (state) => ({ ...state })),
	on(ProfileActions.gotSelf, (state, { profile }) => {
		const s = ({ ...state, selectedAccountId: profile.id });
		return adapter.setOne(profile, s);
	}),
	on(ProfileActions.clear, (state) => {
		const selected = state.selectedAccountId;
		const s = ({ ...state, selectedAccountId: null });
		if (!selected) return s;
		return adapter.removeOne(selected!, s);
	})
)

export const selectProfile: (state: AppState) => ProfileState = (state: AppState) => state.profile;
const { selectEntities, selectIds } = adapter.getSelectors();

const selectSelfProfile = createSelector(
	selectProfile,
	(profile) => !!profile.selectedAccountId ? profile.entities[profile.selectedAccountId] : null
);

export const ProfileSelectors = {
	...adapter.getSelectors(),
	selectSelfProfile
}