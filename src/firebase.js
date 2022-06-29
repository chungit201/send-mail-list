import firebase from 'firebase/app';
import "firebase/messaging";
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyD1skvaaL4vbd3FnrGUwT_BZRvxU7wD6aM",
  authDomain: "send-mail-template.firebaseapp.com",
  projectId: "send-mail-template",
  storageBucket: "send-mail-template.appspot.com",
  messagingSenderId: "703408162953",
  appId: "1:703408162953:web:d55bdbf125a5a7c851de58",
  measurementId: "G-G6L2TPKPQC"
};

firebase.initializeApp(firebaseConfig)
export const storage = firebase.storage()
export { firebase as default};
