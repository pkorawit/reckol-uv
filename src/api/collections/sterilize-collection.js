import { firestore } from "firebase"

const sterilizeCollecion = firestore().collection('sterilize_status')

export const getSterilizeStatus = async ({ lockerId }) => await sterilizeCollecion.doc(lockerId).get()