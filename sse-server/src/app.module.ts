import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ServeStaticModule.forRoot( {
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ChatgptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
