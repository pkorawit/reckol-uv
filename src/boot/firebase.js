import { functions, initializeApp } from "firebase"

export default async () => {
  initializeApp({
    apiKey: "AIzaSyCxilcz78McZHaEYxRsmyd6jPMShtNpD6E",
    authDomain: "reckol-uv.firebaseapp.com",
    databaseURL: "https://reckol-uv.firebaseio.com",
    projectId: "reckol-uv",
    storageBucket: "reckol-uv.appspot.com",
    messagingSenderId: "61427660401",
    appId: "1:61427660401:web:6e0b8c80ae1d061f5b4dd0",
  })

  // functions().useFunctionsEmulator(`http://localhost:5001`)
}
