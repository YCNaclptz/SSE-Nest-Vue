import { Module } from '@nestjs/common';
import { ChatgptController } from './chatgpt.controller';
import { ChatGptService } from './chatgpt.service';

@Module({
  controllers: [ChatgptController],
  providers: [ChatGptService]
})
export class ChatgptModule {}
