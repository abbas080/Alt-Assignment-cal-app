// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQUhKgl099AEy82bumftHSbVDUwTcTYi4",
  authDomain: "react-cal-app-4d5e3.firebaseapp.com",
  projectId: "react-cal-app-4d5e3",
  storageBucket: "react-cal-app-4d5e3.appspot.com",
  messagingSenderId: "314135581748",
  appId: "1:314135581748:web:24e8891b82aa23c2e0e661",
  measurementId: "G-BDCZ67XT0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
