import { RootState } from 'redux/store'

export const termSelector = (state: RootState) => state.ultils.term

export const policySelector = (state: RootState) => state.ultils.policy

export const concurrenciesSelector = (state: RootState) => state.ultils.concurrencies
