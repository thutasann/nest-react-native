import { UserRequest } from '@app/shared';

export interface UserJwt extends UserRequest {
  /**
   * Initialization date
   */
  iat: number;
  /**
   * Expiratin date
   */
  exp: number;
}
