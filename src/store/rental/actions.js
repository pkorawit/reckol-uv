export const getBox = async ({ commit }, payload) => {
    // Get from Firestore
    const box = {
        id: "box id",
        number: "S2",
        status: "Available",
        price: 0,
    }
    console.log('....')
    commit('setRentalBox', box)
}

export const rentBox = async ({ commit }) => {
    try {
        commit('clearRentalPassword')
        commit('setRentalResult', 'success')
    } catch (error) {
        commit('setRentalResult', 'fail')
    }
}