import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  log(message: string): void {
    const timeStamp = new Date().toLocaleDateString();
    console.log(`[${timeStamp}] : ${message}`);
  }

  error(message: string): void {
    console.error(message);
  }

  warn(message: string): void {
    console.warn(message);
  }
}
