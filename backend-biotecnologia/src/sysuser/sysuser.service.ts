import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './sysuser.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  create: any;
  validate: any;
  findAll: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(userData: Partial<User>) {
    try {
      // 1️⃣ Verificamos si el correo ya existe
      const existing = await this.userRepo.findOne({
        where: { email: userData.email },
      });
      if (existing) {
        throw new BadRequestException('El correo ya está registrado');
      }

      // 2️⃣ Aseguramos que el campo password exista antes de encriptar
      if (!userData.password) {
        throw new BadRequestException('La contraseña es obligatoria');
      }

      // 3️⃣ Creamos el nuevo usuario
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser: User = this.userRepo.create({
        ...userData,
        password: hashedPassword,
        creationDate: new Date(),
      });

      // 4️⃣ Guardamos y devolvemos el usuario
      const savedUser = await this.userRepo.save(newUser);

      // Eliminamos el campo password del resultado antes de enviarlo
      const { password, ...result } = savedUser;
      return {
        ok: true,
        user: result,
        message: 'Usuario registrado exitosamente',
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Error al registrar usuario:', error);
      throw new InternalServerErrorException(
        'Error interno al registrar usuario',
      );
    }
  }
}
