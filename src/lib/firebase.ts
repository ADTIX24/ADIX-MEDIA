import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, User, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseAppletConfig from "../../firebase-applet-config.json";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAppletConfig.apiKey || "AIzaSyD_6C_jVMexpHKTJ_Momt4mTjeH_qISiyk",
  authDomain: firebaseAppletConfig.authDomain || "adix-media.firebaseapp.com",
  projectId: firebaseAppletConfig.projectId || "adix-media",
  storageBucket: firebaseAppletConfig.storageBucket || "adix-media.firebasestorage.app",
  messagingSenderId: firebaseAppletConfig.messagingSenderId || "1054370758642",
  appId: firebaseAppletConfig.appId || "1:1054370758642:web:a5f893d111b5b49039356b",
  measurementId: firebaseAppletConfig.measurementId || "G-K8SMM80RYN"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebaseAppletConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseAppletConfig.firestoreDatabaseId) 
  : getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  signInAnonymously,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot
};
export type { User };

/**
 * Isolated upload helper function to upload images to Firebase Storage or compress to lightweight string
 */
export async function uploadImageToStorage(file: File, pathPrefix: string = "uploads"): Promise<string> {
  try {
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const storageRef = ref(storage, `${pathPrefix}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (err) {
    console.warn("Firebase Storage direct upload note, using optimized canvas fallback:", err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 320;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            resolve(rawUrl);
          }
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }
}


