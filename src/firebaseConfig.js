import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCiNPw60sIDNwykjOAUEWtakBu11T3MhyE",
  authDomain: "fir-react-e7e08.firebaseapp.com",
  projectId: "fir-react-e7e08",
  storageBucket: "fir-react-e7e08.appspot.com",
  messagingSenderId: "55123390437",
  appId: "1:55123390437:web:b6055a4e8fe4a6b626c90c",
  measurementId: "G-CYK7HNTKFQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);
