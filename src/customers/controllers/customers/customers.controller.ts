import { Controller, Get } from '@nestjs/common';
import { CustomersService } from 'src/customers/service/customers/customers.service';

@Controller('projects')
export class CustomersController {
    constructor (private customersService: CustomersService) {}
    
    @Get('')
    getCustomers() {
        return this.customersService.findCutomers();
    }
}
