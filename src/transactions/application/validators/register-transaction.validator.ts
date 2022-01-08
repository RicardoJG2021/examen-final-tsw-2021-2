import { Injectable } from '@nestjs/common';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterTransactionRequest } from '../dtos/request/register-transaction-request.dto';

@Injectable()
export class RegisterTransactionValidator {
  constructor() {
  }

  public async validate(
    registerTransactionRequest: RegisterTransactionRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const sellerId: number = registerTransactionRequest.sellerId;
    if (sellerId === 0) {
      notification.addError('sellerId is required', null);
    }
    const orderId: number = registerTransactionRequest.orderId;
    if (orderId === 0) {
      notification.addError('orderId is required', null);
    }
    const campaginId: number = registerTransactionRequest.campaignId;
    if (campaginId === 0) {
      notification.addError('campaginId is required', null);
    }
    const transactionType: string = registerTransactionRequest.transactionType;
    if (transactionType.length <= 0) {
      notification.addError('transactionType is required', null);
    }
    const transactionAmount: number = registerTransactionRequest.transactionAmount;
    if (transactionAmount === 0) {
      notification.addError('transactionAmount is required', null);
    }    
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}