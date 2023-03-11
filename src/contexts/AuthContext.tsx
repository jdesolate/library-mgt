/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */
import {
  createUserWithEmailAndPassword,
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
import swal from 'sweetalert';

import auth from '../configs/firebaseConfig';

type LibraryUser = {
  displayName: string,
  email: string,
  emailVerified: boolean,
  uid: string,
};

enum SweetAlertEnum {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

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
        swal('SIGN UP', 'Successfully created an account!', SweetAlertEnum.SUCCESS);

        return createUserWithEmailResponse;
      }
    } catch (e) {
      swal('SIGN UP', 'Failed to register account.', SweetAlertEnum.ERROR);
    }
  };

  const verify = (user: User) => {
    try {
      sendEmailVerification(user);
      swal('Verification', 'We have sent a verification link to your email! Please open it to verify your account.', SweetAlertEnum.SUCCESS);
    } catch (e) {
      swal('Verification', 'Failed to send email verification.', SweetAlertEnum.ERROR);
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
        swal('LOG IN', 'Successfully signed in.', SweetAlertEnum.SUCCESS);

        return signInWithEmailResponse;
      } if (signInWithEmailResponse && !signInWithEmailResponse.user.emailVerified) {
        swal('LOG IN', 'Your account has not been verified yet. Please check your email.', SweetAlertEnum.WARNING);
        logout();
      }
    } catch (e) {
      swal('LOG IN', 'Invalid user credentials.', SweetAlertEnum.ERROR);
    }
  };

  const reset = async (email: string) => {
    try {
      const resetResponse = await sendPasswordResetEmail(auth, email);
      swal('Reset Password', 'Successfully sent reset password to email.', SweetAlertEnum.SUCCESS);

      return resetResponse;
    } catch (e) {
      swal('Reset Password', 'Failed to send reset password to email.', SweetAlertEnum.ERROR);
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
