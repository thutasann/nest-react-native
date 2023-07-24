import { UserEntity } from 'apps/auth/src/user.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
