import AccountType from '../enums/AccountType.enum';

export type LibraryUser = {
  email: string | null,
  emailVerified?: boolean,
  accountType: AccountType,
  uid: string,
};
