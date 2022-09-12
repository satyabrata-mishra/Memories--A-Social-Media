import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB5wOrkCbaVmf-TP5Mg7YVUJa_dMbichtI",
  authDomain: "blog-application-30845.firebaseapp.com",
  projectId: "blog-application-30845",
  storageBucket: "blog-application-30845.appspot.com",
  messagingSenderId: "544288485747",
  appId: "1:544288485747:web:45cd7469dd010fe9839506",
  measurementId: "G-7J85CCE33X"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);