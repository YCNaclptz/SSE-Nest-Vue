import { Controller, Get, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { AppService } from './app.service';

interface MessageEvent {
  data: string | object;
}
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('event')
  sendEvent(): Observable<MessageEvent>{
    return interval(1000).pipe(
      map((num: number) => ({
        data: `${num}`,
      }))
    )
  }

}
