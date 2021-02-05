import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBu9Ap6Ziu_O4d01bLSYHg9VDpXoqgDyp4",
    authDomain: "trello-clone-42d24.firebaseapp.com",
    databaseURL: "https://trello-clone-42d24-default-rtdb.firebaseio.com",
    projectId: "trello-clone-42d24",
    storageBucket: "trello-clone-42d24.appspot.com",
    messagingSenderId: "161189990644",
    appId: "1:161189990644:web:3f4d11666b7e060b084ea1"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseDB = firebaseApp.database().ref();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider,firebaseDB}