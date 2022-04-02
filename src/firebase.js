import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCW1kCplayvsoqHUdNVvQKYv8rM4_HnEIg",
  authDomain: "jobspanel.firebaseapp.com",
  projectId: "jobspanel",
  storageBucket: "jobspanel.appspot.com",
  messagingSenderId: "609833578328",
  appId: "1:609833578328:web:5bab948b94cdeb5a91ff2d",
  measurementId: "G-9820VRSBXQ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// export const authentication = getAuth(app);
export const db = getFirestore(app);
