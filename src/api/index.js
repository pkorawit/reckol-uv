import { sendOpenLockerCommand } from "./collections/command-collection"
import { setLockerPasscode, setLockerOneTimeKey, getLockerState, isValidMasterCode } from "./collections/locker-collection"
import { addUserLocker, getUserLockers } from "./collections/user-lockers-collection"

export const rentLocker = async ({ lockerId, passcode, userId }) => {
    const [] = await Promise.all([
        setLockerPasscode({ userId, lockerId, passcode }),
        addUserLocker({ userId, lockerId })
    ])
    return commandResult
}

/**
 * 
 * @return {boolean} false if passcode is invalid 
 */
export const unlockLocker = async ({ lockerId, passcode }) => {
    const isValid = isValidMasterCode({ lockerId, masterCode: passcode })

    if (!isValid) {
        return false
    }

    return true
}

export const sendOneTimeCode = async ({ lockerId, onetimeCode }) => await setLockerOneTimeKey({ lockerId, onetimeCode })

export const getUserLockersView = async ({ userId }) => await getUserLockers({ userId })