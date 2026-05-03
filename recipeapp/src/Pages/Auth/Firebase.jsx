import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE4i4hbPlJK9D8K87Xne0KLsFkgqNhlHU",
  authDomain: "recipeappauth-a233f.firebaseapp.com",
  projectId: "recipeappauth-a233f",
  storageBucket: "recipeappauth-a233f.firebasestorage.app",
  messagingSenderId: "676292651988",
  appId: "1:676292651988:web:de3983a9083cbc789d8441",
  measurementId: "G-DZ1DHYEK7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth (IMPORTANT)
export const auth = getAuth(app);

