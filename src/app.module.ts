import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersModule } from './sellers/sellers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { KpisModule } from './kpis/kpis.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SellersModule,
    TransactionsModule,
    KpisModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}