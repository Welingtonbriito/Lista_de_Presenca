import { initializeApp } from 'firebase/app'; 
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAYh5ngWh0XIujMNBFX25cmUH99xoGaSNY",
  authDomain: "projeto-32a54.firebaseapp.com",
  projectId: "projeto-32a54",
  storageBucket: "projeto-32a54.firebasestorage.app",
  messagingSenderId: "658499177065",
  appId: "1:658499177065:web:6e794e705de51f301ef0f8",
  measurementId: "G-V4VB2D8CG3"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };