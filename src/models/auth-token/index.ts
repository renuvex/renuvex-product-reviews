export interface AuthToken {
  authorizedAppId: string;
  merchantId: string;
  salesChannelId: string | null;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expireDate: string;
  refreshToken: string;
  scope?: string;
  createdAt?: string;
  updatedAt?: string;
}
