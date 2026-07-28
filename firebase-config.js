// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// إعدادات Firebase الخاصة بمشروعك

const firebaseConfig = {
  apiKey: "AIzaSyCFCzrqmUGEyk0uc_mDWlGGkwDbZfTpTvU",
  authDomain: "jo-ff-clan-c97c3.firebaseapp.com",
  projectId: "jo-ff-clan-c97c3",
  storageBucket: "jo-ff-clan-c97c3.firebasestorage.app",
  messagingSenderId: "619526988519",
  appId: "1:619526988519:web:7fd63f016a93191bf23842",
  measurementId: "G-6KRVTVSC5F"
};


// تشغيل Firebase

const app = initializeApp(firebaseConfig);


// تشغيل Firestore

const db = getFirestore(app);


// تصدير الأشياء التي نحتاجها

export {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
};