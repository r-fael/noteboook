import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //@ts-ignore
  apiKey: __API_KEY__ ,
  //@ts-ignore
  authDomain: __AUTH_DOMAIN__ ,
  //@ts-ignore
  projectId: __PROJECT_ID__ ,
  //@ts-ignore
  storageBucket: __STORAGE_BUCKET__ ,
  //@ts-ignore
  messagingSenderId: __MESSAGING_SENDER_ID__ ,
  //@ts-ignore
  appId: __APP_ID__ ,
  //@ts-ignore
  measurementId: __MEASUREMENT_ID__
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider() 
export const db = getFirestore(app);
