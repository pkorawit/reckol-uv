import { sendOpenLockerCommand } from "./collections/command-collection"
import { setLockerMasterCode, setLockerOneTimeKey, getLockerState as _getLockerState, isValidMasterCode, isValidOneTimeCode } from "./collections/locker-collection"
import { addFromOtherLocker, addSelfLocker, getUserLockers, removeSelfLocker, removeFromOtherLocker } from "./collections/user-lockers-collection"

const userLockerReducer = (_locker) => {
    const { masterCode, onetimeCode, ...locker } = _locker
    return locker
}

export const rentLocker = async ({ lockerId, passcode, userId }) => {
    const locker = userLockerReducer(
        (await getLockerState({ lockerId })).data()
    )


    await Promise.all([
        setLockerMasterCode({ userId, lockerId, passcode }),
        addSelfLocker({ userId, locker }),
        sendOpenLockerCommand({ lockerId, userId })
    ])

    return true
}

export const sendOneTimeCode = async ({ lockerId, onetimeCode, userId }) => {
    const locker = userLockerReducer(
        (await getLockerState({ lockerId })).data()
    )

    await Promise.all([
        setLockerOneTimeKey({ lockerId, onetimeCode }),
        addFromOtherLocker({ locker, userId }),
        sendOpenLockerCommand({ lockerId, userId })
    ])

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

    const locker = userLockerReducer(
        (await getLockerState({ lockerId })).data()
    )

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

    const locker = userLockerReducer(
        (await getLockerState({ lockerId })).data()
    )

    await Promise.all([
        sendOpenLockerCommand({ lockerId, userId }),
        removeFromOtherLocker({ userId, locker })
    ])

    return true
}



export const getUserLockersView = async ({ userId }) => await getUserLockers({ userId })

export const getLockerState = async ({ lockerId }) => await _getLockerState({ lockerId })