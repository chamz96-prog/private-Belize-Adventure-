import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MockPaymentDto } from './dto/mock-payment.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('payments/mock-pay')
  mockPay(@Body() dto: MockPaymentDto) {
    return this.paymentsService.mockPay(dto);
  }
}
