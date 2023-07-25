import { Injectable } from '@nestjs/common';
import {
  FriendRequestEntity,
  BaseAbstractRepository,
  FriendRequestRepositoryInterface,
} from '@app/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendRequestRepository
  extends BaseAbstractRepository<FriendRequestEntity>
  implements FriendRequestRepositoryInterface
{
  constructor(
    @InjectRepository(FriendRequestEntity)
    private readonly FriendRequestRepository: Repository<FriendRequestEntity>,
  ) {
    super(FriendRequestRepository);
  }
}
