import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCFLxTSb08GcEaCUYrWODbi4YJFlqjoB1Q",
    authDomain: "trello-clone-ae5f0.firebaseapp.com",
    projectId: "trello-clone-ae5f0",
    storageBucket: "trello-clone-ae5f0.appspot.com",
    messagingSenderId: "534886810801",
    appId: "1:534886810801:web:fa8780ad0f7e9ffabe4e90"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider}