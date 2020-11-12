import { firestore } from "firebase"

const commandsCollection = firestore().collection('commands')

export const sendOpenLockerCommand = ({ userId, lockerId }) => await commandsCollection.add({
    invoker: userId,
    name: 'open',
    target: lockerId,
    executed: false,
    startAt: null
})