import { createAction } from '@reduxjs/toolkit'
import { Concurrencies, Policy, Term } from 'models/Ultils'

// Term and condition
export const GET_TERM = 'GET_TERM'
export const getTermAction = createAction('GET_TERM')

export const GET_TERM_SUCCESS = 'GET_TERM_SUCCESS'
export const getTermSuccess = createAction<Term>('GET_TERM_SUCCESS')

// Policy
export const GET_POLICY = 'GET_POLICY'
export const getPolicyAction = createAction('GET_POLICY')

export const GET_POLICY_SUCCESS = 'GET_POLICY_SUCCESS'
export const getPolicySuccess = createAction<Policy>('GET_POLICY_SUCCESS')

// Concurrencies
export const GET_CONCURRENCI = 'GET_CONCURRENCI'
export const getConcurrenciesAction = createAction('GET_CONCURRENCI')

export const GET_CONCURRENCI_SUCCESS = 'GET_CONCURRENCI_SUCCESS'
export const getConcurrenciesSuccess = createAction<Concurrencies>('GET_CONCURRENCI_SUCCESS')
