import { firestore } from "firebase"

const userLockersCollection = firestore().collection('user_lockers')

export const addSelfLocker = async ({ userId, locker }) => await userLockersCollection.doc(userId).update({
    myLockers: firebase.firestore.FieldValue.arrayUnion(locker)
})

export const removeSelfLocker = async ({ userId, locker }) => await userLockersCollection.doc(userId).update({
    myLockers: firebase.firestore.FieldValue.arrayRemove(locker)
})

export const addFromOtherLocker = async ({ userId, locker }) => await userLockersCollection.doc(userId).update({
    fromOthers: firebase.firestore.FieldValue.arrayUnion(locker)
})

export const removeFromOtherLocker = async ({ userId, locker }) => await userLockersCollection.doc(userId).update({
    fromOthers: firebase.firestore.FieldValue.arrayRemove(locker)
})


export const getUserLockers = async ({ userId }) => {
    const snapshot = await userLockersCollection.where('userId', '==', userId).get()

    if (snapshot.size === 0) {
        return null
    }

    return snapshot.docs[0].data()
}