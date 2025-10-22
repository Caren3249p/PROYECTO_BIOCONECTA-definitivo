import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../sysuser/sysuser.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.validate(email, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email }; // ✅ campo correcto
    const access_token = await this.jwt.signAsync(payload);

    return {
      ok: true,
      access_token,
      user: {
        idsysuser: user.id, // ✅ corregido
        userName: user.userName,
        userLastname: user.userLastname,
        email: user.email,
      },
    };
  }

  async register(dto: {
    userName: string;
    userLastname: string;
    email: string;
    password: string;
  }) {
    const created = await this.users.create(dto);
    return { ok: true, id: created.id }; // ✅ corregido
  }
}
