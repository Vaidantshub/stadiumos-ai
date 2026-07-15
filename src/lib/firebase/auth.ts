import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut as fbSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, hasConfig } from "./config";
import { UserProfile } from "@/lib/types";

export function subscribeToAuth(callback: (user: User | null) => void) {
  if (!hasConfig || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle(): Promise<void> {
  if (!hasConfig || !auth) throw new Error("Firebase is not configured. Add env vars to enable auth.");
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await upsertUserProfile(result.user);
}

export async function signInAsGuest(): Promise<void> {
  if (!hasConfig || !auth) throw new Error("Firebase is not configured. Add env vars to enable auth.");
  const result = await signInAnonymously(auth);
  await upsertUserProfile(result.user, true);
}

export async function signOutUser(): Promise<void> {
  if (!hasConfig || !auth) return;
  await fbSignOut(auth);
}

async function upsertUserProfile(user: User, isGuest = false): Promise<void> {
  if (!db) return;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const profile: Partial<UserProfile> = {
      uid: user.uid,
      displayName: user.displayName || (isGuest ? "Guest Fan" : "Fan"),
      email: user.email || "",
      photoURL: user.photoURL || "",
      role: "fan",
      language: "en",
      accessibilityMode: false,
    };
    await setDoc(ref, { ...profile, createdAt: serverTimestamp() }, { merge: true });
  }
}
