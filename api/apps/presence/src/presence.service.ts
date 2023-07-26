import { Injectable } from '@nestjs/common';

@Injectable()
export class PresenceService {
  getHello(): { foo: string } {
    console.log('NOT CACHED 🔓');
    return {
      foo: 'Hello from Presence!',
    };
  }
}
