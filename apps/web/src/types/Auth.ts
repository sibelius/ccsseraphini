import { Account, Profile, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export type JWTToken = JWT & {
  refresh_token?: string;
  accessTokenExpires?: number;
};

export interface JWTParams {
  token: JWTToken;
  user?: User | undefined;
  account?: Account | undefined;
  profile?: Profile | undefined;
  isNewUser?: boolean | undefined;
}
