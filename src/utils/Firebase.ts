import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import auth from '../configs/firebaseConfig';

async function forgotPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

async function logout() {
  signOut(auth);
}

async function registerWithEmailAndPassword(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  return user;
}

async function sendVerificationEmail(user: User) {
  sendEmailVerification(user);
}

async function signInWithEmailPassword(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export {
  auth,
  forgotPassword,
  logout,
  registerWithEmailAndPassword,
  sendVerificationEmail,
  signInWithEmailPassword,
};
