import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAj3C5Gzoj95nZiu04LuwsjnoJ69ONm4Kg",
  authDomain: "capstone-project-6b03b.firebaseapp.com",
  databaseURL:
    "https://capstone-project-6b03b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-project-6b03b",
  storageBucket: "capstone-project-6b03b.appspot.com",
  messagingSenderId: "152529052734",
  appId: "1:152529052734:web:2a441dea89abb773f11d6f",
  measurementId: "G-2K6VVB3ZDK",
});

export const db = getDatabase(app);
export const auth = getAuth(app);
