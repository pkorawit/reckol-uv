import { firestore } from "firebase"

const userLockersCollection = firestore().collection('user_lockers')

export const createUserLockers = async ({ userId, phoneNumber }) => await userLockersCollection.doc(phoneNumber).set({
    userId,
    phoneNumber,
    myLockers: [],
    shareLockers: []
})

export const isUserLockersExists = async ({ phoneNumber }) => {
    const doc = await userLockersCollection.doc(phoneNumber).get()   
    if (doc.exists) {
        return true
    } else {
        return false
    }
}


export const addSelfLocker = async ({ userId, locker }) => await userLockersCollection.doc(userId).update({
    myLockers: firestore.FieldValue.arrayUnion({
        createdAt: new Date(),
        ...locker,
        status: 'occupied'
    })
})

export const updateSelfLocker = async ({ userId, locker }) => {
    const snapshot = await userLockersCollection.doc(userId).get()
    const userLockers = snapshot.data()
    const index = userLockers.myLockers.findIndex(_ => _.id === locker.id)
    userLockers.myLockers[index] = locker
    return await snapshot.ref.update(userLockers)
}

export const removeSelfLocker = async ({ userId, locker }) => {
    const snapshot = await userLockersCollection.doc(userId).get()
    const userLockers = snapshot.data()
    userLockers.myLockers = userLockers.myLockers.filter((x) => x.id !== locker.id)
    return await snapshot.ref.update(userLockers)
}

export const addShareLocker = async ({ phoneNumber, locker }) => {
    const userLockers = (await userLockersCollection.where('phoneNumber', '==', phoneNumber).get()).docs[0]
    if (!userLockers) {
        throw new Error("User Lockers Not Found.")
    }
    await userLockers.ref.update({
        shareLockers: firestore.FieldValue.arrayUnion({
            createdAt: new Date(),
            ...locker,
            status: 'occupied'
        })
    })
}

export const removeShareLocker = async ({ userId, locker }) => {
    const snapshot = await userLockersCollection.doc(userId).get()
    const userLockers = snapshot.data()
    userLockers.shareLockers = userLockers.shareLockers.filter((x) => x.id !== locker.id)
    return await snapshot.ref.update(userLockers)
}


export const getUserLockers = async ({ userId }) => {
    const snapshot = await userLockersCollection.where('userId', '==', userId).get()

    if (snapshot.size === 0) {
        return null
    }

    return snapshot.docs[0].data()
}