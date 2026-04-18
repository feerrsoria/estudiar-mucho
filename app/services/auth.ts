import { User } from "firebase/auth";
import { signIn, signUp, logout, onAuthChange } from "../lib/firebase/auth";
import { auth } from "../lib/firebase/config";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";

export interface AuthInterface {
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
  signUp(email: string, password: string): Promise<User | null>;
  signIn(email: string, password: string): Promise<User | null>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

class AuthService implements AuthInterface {
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthChange(callback);
  }

  async signUp(email: string, password: string): Promise<User | null> {
    try {
      const result = await signUp(email, password);
      return result.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const result = await signIn(email, password);
      return result.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async signOut(): Promise<void> {
    await logout();
  }

  async updateUser(data: { displayName?: string; photoURL?: string }) {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, data);
    }
  }
}

const authService = new AuthService();
export default authService;
