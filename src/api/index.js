import { sendOpenLockerCommand } from "./collections/command-collection"
import { setLockerMasterCode, setLockerOneTimeKey, getLockerState as _getLockerState, isValidMasterCode, isValidOneTimeCode } from "./collections/locker-collection"
import { addShareLocker, addSelfLocker, getUserLockers, removeSelfLocker, removeShareLocker, updateSelfLocker } from "./collections/user-lockers-collection"

export const rentLocker = async ({ lockerId, passcode, userId }) => {
    const locker = {
        id: lockerId,
        ...(await getLockerState({ lockerId })).data()
    }

    await Promise.all([
        setLockerMasterCode({ lockerId, masterCode: passcode, owner: userId }),
        addSelfLocker({ userId, locker }),
        sendOpenLockerCommand({ lockerId, userId })
    ])

    return true
}

export const sendOneTimeCode = async ({ lockerId, onetimeCode, targetPhoneNumber }) => {

    await setLockerOneTimeKey({ lockerId, onetimeCode })

    const locker = {
        id: lockerId,
        ...(await getLockerState({ lockerId })).data()
    }

    await addShareLocker({ locker, phoneNumber: targetPhoneNumber })
    await updateSelfLocker({ userId: locker.ownner, locker })

    return true
}

/**
 * 
 * @return {boolean} false if passcode is invalid 
 */
export const unlockSelfLocker = async ({ lockerId, passcode, userId }) => {
    const isValid = await isValidMasterCode({ lockerId, masterCode: passcode })

    if (!isValid) {
        return false
    }

    const locker = {
        id: lockerId,
        ...(await getLockerState({ lockerId })).data()
    }

    await Promise.all([
        sendOpenLockerCommand({ lockerId, userId }),
        removeSelfLocker({ userId, locker })
    ])


    return true
}

/**
 * 
 * @return {boolean} false if passcode is invalid 
 */
export const unlockOneTimeLocker = async ({ lockerId, passcode, userId }) => {
    const isValid = await isValidOneTimeCode({ lockerId, onetimeCode: passcode })

    if (!isValid) {
        return false
    }

    const locker = {
        id: lockerId,
        ...(await getLockerState({ lockerId })).data()
    }

    await Promise.all([
        sendOpenLockerCommand({ lockerId, userId }),
        removeShareLocker({ userId, locker }),
        removeSelfLocker({ userId: locker.ownner, locker })
    ])

    return true
}



export const getUserLockersView = async ({ userId }) => await getUserLockers({ userId })

export const getLockerState = async ({ lockerId }) => await _getLockerState({ lockerId })