import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {

    findCutomers() {
        return {
            message: 'ok',
        };
    }
}
