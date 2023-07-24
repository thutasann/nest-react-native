import { UserEntity } from 'apps/auth/src/user.entity';
import { BaseInterfaceRepository } from '@app/shared';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
