
import { User as FirebaseUserDetails } from 'firebase/auth';

export type LibraryUser = {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  uid: string,
};

export type UserContextType = {
  firebaseUserDetails?: FirebaseUserDetails | null;
  loadingFirebaseUserDetails: boolean;
  loadingUserDetails: boolean;
  userDetails: LibraryUser | null;
  setUserDetails: (params: LibraryUser) => void;
};
