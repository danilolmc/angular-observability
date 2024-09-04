import { ErrorHandler, Injectable } from "@angular/core";
import { faro } from '@grafana/faro-web-sdk';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    faro.api.pushError(error);
    console.error(error);
  }
}