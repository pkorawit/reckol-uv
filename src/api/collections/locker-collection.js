import { firestore } from "firebase"

const lockersCollection = firestore().collection('lockers')

export const setLockerMasterCode = async ({ lockerId, masterCode, owner }) => await lockersCollection.doc(lockerId).update({
    masterCode,
    ownner: owner,
})

export const setLockerSharing = async ({ lockerId, isSharing, targetPhoneNumber }) => await lockersCollection.doc(lockerId).update({
    sharing: {
        targetPhoneNumber,
        isSharing
    }
})

export const setLockerStatus = async ({ lockerId, status }) => await lockersCollection.doc(lockerId).update({
    status
})

export const setLockerOneTimeKey = async ({ lockerId, onetimeCode }) => await lockersCollection.doc(lockerId).update({
    onetimeCode,
})

export const getLockerState = async ({ lockerId }) => (await lockersCollection.doc(lockerId).get())

export const watchLockerState = async ({ lockerId, onChanges, onError }) => lockersCollection.doc(lockerId).onSnapshot((snapshot, error) => {
    if (error) {
        onError(error)
        console.error(error);
    }
    onChanges(snapshot)

})

export const isValidMasterCode = async ({ lockerId, masterCode }) => {
    const locker = await getLockerState({ lockerId })
    return locker.data().masterCode === masterCode
}

export const isValidOneTimeCode = async ({ lockerId, onetimeCode }) => {
    const locker = await getLockerState({ lockerId })
    return locker.data().onetimeCode === onetimeCode
}