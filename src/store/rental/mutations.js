export const clearRentalBox = state => state.selectedBox = {}

export const setRentalBox = (state, payload) => state.selectedBox = payload

export const setRentalPassword = (state, payload) => state.password = payload

export const clearRentalPassword = state => state.password = ''

export const setRentalResult = (state, payload) => state.result = payload

export const setRentalStep = (state, payload) => state.step = payload