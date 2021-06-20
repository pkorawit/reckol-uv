import { functions } from "firebase"
import { sendOpenLockerCommand, } from "./collections/command-collection"
import { setLockerMasterCode, setLockerOneTimeKey, getLockerState as _getLockerState, isValidMasterCode, isValidOneTimeCode, setLockerStatus, setLockerSharing } from "./collections/locker-collection"
import { addShareLocker, addSelfLocker, getUserLockers, removeSelfLocker, removeShareLocker, updateSelfLocker } from "./collections/user-lockers-collection"

export const rentLocker = async ({ lockerId, passcode, userId }) => {
    const locker = {
        id: lockerId,
        ...(await getLockerState({ lockerId })).data()
    }

    await Promise.all([
        setLockerMasterCode({ lockerId, masterCode: passcode, owner: userId }),
        addSelfLocker({ userId, locker }),
        sendOpenLockerCommand({ lockerId, userId }),
        setLockerStatus({ lockerId, status: 'occupied' })
    ])

    return true
}

const sendSMS = functions().httpsCallable('sendSMS')

export const sendOneTimeCode = async ({ lockerId, onetimeCode, targetPhoneNumber }) => {
    try {

        await setLockerOneTimeKey({ lockerId, onetimeCode })

        const locker = {
            id: lockerId,
            ...(await getLockerState({ lockerId })).data()
        }

        await addShareLocker({ locker, phoneNumber: targetPhoneNumber })
        await updateSelfLocker({ userId: locker.ownner, locker })
        await setLockerSharing({ lockerId: locker.id, isSharing: true, targetPhoneNumber })

        const message = `
    ได้รับ Locker: ${lockerId}\n\r
    รหัสปลดล็อค: ${onetimeCode}\n\r
    ตรวจสอบ: https://reckol-uv.web.app
    `
        // await sendSMS({ target: targetPhoneNumber, message })
        return [null, null]
    } catch (error) {
        return [error, null]
    }

}

export const cancelShareLocker = async ({ locker, }) => {
    const { targetPhoneNumber } = locker.sharing
    await setLockerSharing({ lockerId: locker.id, isSharing: false, targetPhoneNumber: '' })
    await removeShareLocker({ userId: targetPhoneNumber, locker })
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

    console.log({ lockerId, passcode, userId });

    await Promise.all([
        sendOpenLockerCommand({ lockerId, userId }),
        removeSelfLocker({ userId, locker }),
        setLockerStatus({ lockerId, status: 'available' })
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

    await sendOpenLockerCommand({ lockerId, userId })
    await removeShareLocker({ userId, locker })
    await removeSelfLocker({ userId: locker.ownner, locker })
    await setLockerStatus({ lockerId, status: 'available' })
    await setLockerSharing({ lockerId: locker.id, isSharing: false, targetPhoneNumber: '' })


    return true
}



export const getUserLockersView = async ({ userId }) => await getUserLockers({ userId })

export const getLockerState = async ({ lockerId }) => await _getLockerState({ lockerId })