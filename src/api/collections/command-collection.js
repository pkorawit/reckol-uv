import { firestore } from "firebase"

const commandsCollection = firestore().collection('commands')

export const sendOpenLockerCommand = async ({ userId, lockerId }) => await commandsCollection.add({
    invoker: userId,
    name: 'open',
    target: lockerId,
    executed: false,
    startAt: Date.now()
}).then(res => console.log('open locker command sent'))

export const sentSterilizeLockerCommand = async ({ userId, lockerId }) => await commandsCollection.add({
    invoker: userId,
    name: 'sterilize',
    target: lockerId,
    executed: false,
    startAt: Date.now()
}).then(res => console.log(res))