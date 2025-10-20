// Import the functions you need from the SDKs you need // copied from firebase 
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-b5b17.firebaseapp.com",
  projectId: "mern-project-b5b17",
  storageBucket: "mern-project-b5b17.appspot.com",
  messagingSenderId: "693669210575",
  appId: "1:693669210575:web:f514860e77eca55049caba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);