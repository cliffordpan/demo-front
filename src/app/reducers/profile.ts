import { createActionGroup, createReducer, createSelector, emptyProps, on, props } from "@ngrx/store";
import { AppState } from ".";
import { Account } from "../models";


export const ProfileActions = createActionGroup({
	source: 'Profile API',
	events: {
		'Get Self': props<{ email: string }>(),
		'Got Self': props<{ profile: Account }>(),
		'Update Self': props<{ profile: Partial<Account> }>(),
		'Clear': emptyProps()
	}
});

export interface ProfileState {
	self: Account | null
}

const initialState: ProfileState = {
	self: null
}

export const reducer = createReducer(
	initialState,
	on(ProfileActions.getSelf, (state) => ({ ...state, self: null })),
	on(ProfileActions.gotSelf, (state, { profile }) => ({ ...state, self: profile })),
	on(ProfileActions.clear, (state) => (initialState))
)

export const selectProfile = (state: AppState) => state.profile;

export const selectSelfProfile = createSelector(
	selectProfile,
	(profile) => profile?.self
);