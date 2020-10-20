import { auth, firestore } from "firebase"

const collection = firestore().collection('locker')

export const getLocker = async ({ id }) => (await collection.doc(id).get()).data()

export const rentLocket = async ({ id, password }) => (await collection.doc(id).update({ status: 'BUSY', password }))

export const signIn = async ({ email, password }) => (await auth().signInWithEmailAndPassword(email, password)).user