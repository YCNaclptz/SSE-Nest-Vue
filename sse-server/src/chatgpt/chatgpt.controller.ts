import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatGptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
    constructor(private readonly chatGptService: ChatGptService) {}
    @Get()
  async chatGptConversation(@Query('prompt') prompt: string, @Res() res: Response): Promise<void> {
    const chatStream = await this.chatGptService.createCompletionStream(prompt);

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);

    for await (const chunk of chatStream) {
      res.write(`data: ${chunk.choices[0]?.delta?.content}\n\n`);
      await this.chatGptService.sleep(20);
    }

    res.end();
  }
}
