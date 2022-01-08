import { Result } from 'typescript-result';
import { AppNotification } from "src/common/application/app.notification";

export class SellerName {
  private readonly value: string;
  private static MAX_LENGTH: number = 200;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(name: string): Result<AppNotification, SellerName> {
    let notification: AppNotification = new AppNotification();
    name = (name ?? "").trim();
    if (name === "") {
      notification.addError('name is required', null);
    }
    if (name.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new SellerName(name));
  }
}