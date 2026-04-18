
import { test, expect, vi } from 'vitest';
import AuthService from '../services/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

test('should sign up a user', async () => {
  const user = { uid: '123' };
  (createUserWithEmailAndPassword as any).mockResolvedValue({ user });

  const result = await AuthService.signUp('test@example.com', 'password');

  expect(result).toEqual(user);
});

test('should sign in a user', async () => {
  const user = { uid: '123' };
  (signInWithEmailAndPassword as any).mockResolvedValue({ user });

  const result = await AuthService.signIn('test@example.com', 'password');

  expect(result).toEqual(user);
});

test('should sign out a user', async () => {
  (signOut as any).mockResolvedValue(undefined);

  await AuthService.signOut();

  expect(signOut).toHaveBeenCalled();
});
