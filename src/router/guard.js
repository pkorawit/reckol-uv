import { auth } from "firebase"

async function guestGuard({
    to,
    user,
    next
}) {
    if (!user) {
        return next({ name: 'Login' })
    }
    const { user: guest } = await auth().signInAnonymously()

    localStorage.setItem("auth__user", JSON.stringify(guest));

    return next()
}

async function memberGuard({
    user,
    next
}) {
    if (!user) {
        return next({ name: 'Login' })
    }
    return next()
}

export async function authorizeGuard({
    to,
    user,
    next
}) {

    const GuestHandlerPageName = 'guest'
    if (to.name === GuestHandlerPageName) {
        return await guestGuard({
            to,
            user,
            next
        })
    }

    if (to.name !== 'Login') {
        return await memberGuard({
            user,
            next
        })
    }


    return next()
}