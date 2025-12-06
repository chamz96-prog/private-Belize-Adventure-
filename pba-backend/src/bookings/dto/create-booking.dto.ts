export class QuoteBookingDto {
  tourId: number;
  adults: number;
  children: number;
}

export class CreateBookingDto {
  tourId: number;
  date: string;
  adults: number;
  children: number;
  guest: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  };
}
