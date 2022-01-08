import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersModule } from './citas/citas.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SellersModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}