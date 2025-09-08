import { DatePipe, DecimalPipe } from "@angular/common";
import { Provider } from "@angular/core";
import { MessageService } from "./services/message.service";

export function providerWui(): Provider[] {
    return [
      DatePipe,
      DecimalPipe,
      MessageService
    ] as Provider[];
  }