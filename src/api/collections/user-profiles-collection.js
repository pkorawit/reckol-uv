import { firestore } from "firebase"

const userProfileCollection = firestore().collection('user_profiles')

export const createUserProfiles = async ({ userId, phoneNumber }) => await userProfileCollection.doc(phoneNumber).set({
    userId,
    phoneNumber
})