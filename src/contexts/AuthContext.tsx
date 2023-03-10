/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import {
  createContext, useContext, useEffect, useState,
} from 'react';

import auth from '../configs/firebaseConfig';

type LibraryUser = {
  displayName: string,
  email: string,
  emailVerified: boolean,
  uid: string,
};

type UserContextType = {
  user: LibraryUser | null,
  login: (email: string, password: string) => Promise<UserCredential | undefined>,
  logout: () => void,
  register: (email: string, password: string) => Promise<UserCredential | undefined>,
  reset: (email: string) => void,
  verify: (user: User) => void,
};

const AuthContext = createContext<UserContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<LibraryUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName ?? '',
          email: user.email ?? '',
          emailVerified: user.emailVerified,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string): Promise<UserCredential | undefined> => {
    try {
      const createUserWithEmailResponse = await createUserWithEmailAndPassword(auth, email, password);

      if (createUserWithEmailResponse.user) {
        console.log('Successfully created an account!');

        return createUserWithEmailResponse;
      }
    } catch (e) {
      console.log('Failed to register account.');

      console.log(e);
    }
  };

  const verify = (user: User) => {
    try {
      sendEmailVerification(user);
      console.log('We have sent a verification link to your email! Please open it to verify your account.');
    } catch (e) {
      console.log('Failed to send email verification.');
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const login = async (email: string, password: string): Promise<UserCredential | undefined> => {
    try {
      const signInWithEmailResponse = await signInWithEmailAndPassword(auth, email, password);

      if (signInWithEmailResponse && signInWithEmailResponse.user.emailVerified) {
        console.log('Successfully signed in.');

        return signInWithEmailResponse;
      } if (signInWithEmailResponse && !signInWithEmailResponse.user.emailVerified) {
        console.log('Your account has not been verified yet. Please check your email.');
        logout();
      }
    } catch (e) {
      console.log('Invalid user credentials.');
    }
  };

  const reset = async (email: string) => {
    try {
      const resetResponse = await sendPasswordResetEmail(auth, email);

      return resetResponse;
    } catch (e) {
      console.log('Failed to send reset password to email.');
    }
  };

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      register,
      reset,
      user,
      verify,
    }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
