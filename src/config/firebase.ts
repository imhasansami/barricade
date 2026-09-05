import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-gpanTLjHF3wcCzukzKub4NrA637SWJY",
  authDomain: "barricade-29bf4.firebaseapp.com",
  projectId: "barricade-29bf4",
  storageBucket: "barricade-29bf4.firebasestorage.app",
  messagingSenderId: "936021249432",
  appId: "1:936021249432:web:49d5a4b5ed03d5cf292fed",
  measurementId: "G-YZFMTX4JRS"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, "https://barricade-29bf4-default-rtdb.asia-southeast1.firebasedatabase.app/");