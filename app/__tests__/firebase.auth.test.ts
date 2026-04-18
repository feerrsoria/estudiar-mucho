import { vi, describe, it, expect } from "vitest";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { signIn, signUp, logout } from "../lib/firebase/auth";

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("../lib/firebase/config", () => ({
  auth: {},
}));

describe("Firebase Auth Service", () => {
  it("should sign in with email and password", async () => {
    const email = "test@example.com";
    const password = "password123";
    (signInWithEmailAndPassword as any).mockResolvedValue({ user: { email } });

    const result = await signIn(email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, email, password);
    expect(result.user.email).toBe(email);
  });

  it("should sign up with email and password", async () => {
    const email = "test@example.com";
    const password = "password123";
    (createUserWithEmailAndPassword as any).mockResolvedValue({ user: { email } });

    const result = await signUp(email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, email, password);
    expect(result.user.email).toBe(email);
  });

  it("should sign out", async () => {
    (signOut as any).mockResolvedValue(undefined);

    await logout();

    expect(signOut).toHaveBeenCalled();
  });
});
