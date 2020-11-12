import { firestore } from "firebase"

const userLockersCollection = firestore().collection('user_lockers')

export const addUserLocker = async ({ userId, lockerId }) => await userLockersCollection.doc(userId).update({
    myLockers: firebase.firestore.FieldValue.arrayUnion(lockerId)
})

export const getUserLockers = async ({ userId }) => {
    const snapshot = await userLockersCollection.where('userId', '==', userId).get()

    if (snapshot.size === 0) {
        return null
    }

    return snapshot.docs[0].data()
}