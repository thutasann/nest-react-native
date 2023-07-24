import { BaseInterfaceRepository } from '@app/shared';
import { UserEntity } from '@app/shared';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
