import { createClient } from "../lib/supabase/client";
import { User } from "@supabase/supabase-js";

export interface AuthInterface {
  onAuthStateChanged(callback: (user: User | null) => void): void;
  signUp(email: string, password: string): Promise<User | null>;
  signIn(email: string, password: string): Promise<User | null>;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

class AuthService implements AuthInterface {
  private supabase = createClient();

  onAuthStateChanged(callback: (user: User | null) => void) {
    this.supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null);
    });
  }

  async signUp(email: string, password: string): Promise<User | null> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return null;
    }
    return data.user;
  }

  async signIn(email: string, password: string): Promise<User | null> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return null;
    }
    return data.user;
  }

  async signInWithGoogle(): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async updateUser(data: any) {
    await this.supabase.auth.updateUser({ data });
  }
}

const authService = new AuthService();
export default authService;
