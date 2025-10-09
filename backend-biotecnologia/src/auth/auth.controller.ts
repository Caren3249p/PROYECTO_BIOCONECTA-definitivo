import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // 🔹 LOGIN
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Debe proporcionar email y contraseña');
    }

    return this.auth.login(email, password);
  }

  // 🔹 REGISTER
  @Post('register')
  async register(
    @Body()
    body: {
      userName: string;
      userLastname: string;
      email: string;
      password: string;
    },
  ) {
    return this.auth.register(body);
  }
}
