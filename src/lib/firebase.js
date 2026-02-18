import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore, enableMultiTabIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCslEuod-pEir-mMQOL7bY1A0t-pXZC94E",
    authDomain: "uniguide-360.firebaseapp.com",
    projectId: "uniguide-360",
    storageBucket: "uniguide-360.firebasestorage.app",
    messagingSenderId: "625570490356",
    appId: "1:625570490356:web:c4c8c50188ef37f55fbba1",
    measurementId: "G-TNXGV95PMF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with settings to fix "client offline" issues
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

export const storage = getStorage(app);
