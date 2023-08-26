/**
 * Contains firebase defaults
 *
 */
import { initializeApp } from "firebase/app";

const firebaseConifg = {
  apiKey: "AIzaSyD-13zWJXn5ibKw6PF342KlNUX0LFHobq8",
  authDomain: "chatwithme-7ce5a.firebaseapp.com",
  projectId: "chatwithme-7ce5a",
  storageBucket: "chatwithme-7ce5a.appspot.com",
  messagingSenderId: "354617182950",
  appId: "1:354617182950:web:53dae27605edec9d98c927",
};

const firebaseApp = initializeApp(firebaseConifg);

export default firebaseApp;
