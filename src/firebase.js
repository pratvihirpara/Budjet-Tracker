import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_VCcRxDaYL7IKfRSiIIFJ2D6YPBWfNNs",
  authDomain: "budget-tracker-a7550.firebaseapp.com",
  projectId: "budget-tracker-a7550",
  storageBucket: "budget-tracker-a7550.appspot.com", // <-- fixed here
  messagingSenderId: "1035627018681",
  appId: "1:1035627018681:web:e69ae1d6c7fbeabda71e68",
  measurementId: "G-PB0PZ6ERCH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);