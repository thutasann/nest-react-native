import { ConversationEntity } from '../entities/conversation.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ConversationRepositoryInterface
  extends BaseInterfaceRepository<ConversationEntity> {
  /**
   * Fine Conversation Method
   */
  findConversation(
    userId: number,
    friendId: number,
  ): Promise<ConversationEntity | undefined>;
}
