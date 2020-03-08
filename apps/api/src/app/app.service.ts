import { Injectable } from '@nestjs/common';
import { Message } from '@schoolbudget/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!', budget: 20 };
  }
}
