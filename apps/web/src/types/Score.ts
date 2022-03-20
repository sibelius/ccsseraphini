import { Account, Profile } from 'next-auth';

export type AccountProfile = {
  account: Account;
  profile: Profile & Record<string, any>;
};
