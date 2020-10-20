import { auth } from "firebase";

export default async ({ router }) => {
  auth().onAuthStateChanged(user => {
    if (!user) {
      router.push('/sign-in')
    }

    router.push('/rental')
  })
}
