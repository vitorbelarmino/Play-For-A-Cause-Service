import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { atte: 'Hello World!' };
  }
}
