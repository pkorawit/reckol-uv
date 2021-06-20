import { firestore } from "firebase"

const commandsCollection = firestore().collection('commands')

export const getAppSetting = async () => (await commandsCollection.doc('default').get()).data()