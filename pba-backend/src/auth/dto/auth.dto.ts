export class LoginDto {
  email!: string;
  password!: string;
}

export class RegisterDto {
  email!: string;
  password!: string;
  name?: string;
}

export interface JwtPayload {
  email: string;
  sub: number;
}
