import { auth, firestore } from "firebase"

const lockerCollection = firestore().collection('locker')

const commandCollection = firestore().collection('command')

/**
 * To get the current state of box of provided boxId 
 * 
 * @param {String} boxId Id of box 
 * @returns {Object} Object of provided boxId document
 */
export const getLocker = async ({ boxId }) => (await lockerCollection.doc(boxId).get())

/**
 * To watch the state changes of provided boxId 
 *
 * @param {String} boxId Id of box
 * @returns {Object} Object of provided boxId document
 */
export const watchLocker = async ({ boxId, onChanges, onError }) => lockerCollection.doc(boxId).onSnapshot((snapshot, error) => {
    if (error) {
        onError(error)
        console.error(error);
    }
    onChanges(snapshot)
})

/**
 * To rent the locker 
 * 
 * @param {String} boxId Id of box
 * @param {String} password Master key for locker
 * @param {String} userId Renter
 * @returns {Object} Object of Command Result
 */
export const rentLocket = async ({ boxId, password, userId }) => {
    const [commandResult] = await Promise.all([
        commandCollection.add({
            invoker: userId,
            name: 'open',
            target: boxId,
            executed: false,
            startAt: null
        }),

        lockerCollection.doc(boxId).set({
            masterCode: password,
            owner: userId,
        }, { merge: true })
    ])
    return commandResult
}

/**
 * 
 * @param {email} email Email of user
 * @param {password} password Password of user
 * @returns {Object} Object of User Credential 
 */
export const signIn = async ({ email, password }) => await auth().signInWithEmailAndPassword(email, password)