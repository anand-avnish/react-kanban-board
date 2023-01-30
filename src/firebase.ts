import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBaq5OZL2Rs4YZulvz8Vdxc2BS2WGdhL-M",
    authDomain: "react-kanban-board-69b5a.firebaseapp.com",
    projectId: "react-kanban-board-69b5a",
    storageBucket: "react-kanban-board-69b5a.appspot.com",
    messagingSenderId: "681426778144",
    appId: "1:681426778144:web:358a368dc761bac2ede445"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}