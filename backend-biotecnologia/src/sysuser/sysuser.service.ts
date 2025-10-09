import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './sysuser.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Buscar usuario por correo electrónico o nombre de usuario
   */
  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: [{ email: identifier }, { userName: identifier }],
    });
  }

  /**
   * Validar credenciales del usuario
   */
  async validate(emailOrUsername: string, password: string): Promise<User | null> {
    const user = await this.findByEmailOrUsername(emailOrUsername);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Si la contraseña no está hasheada, la actualiza automáticamente
    if (!isPasswordValid && user.password === password) {
      const newHash = await bcrypt.hash(password, 10);
      user.password = newHash;
      await this.userRepo.save(user);
      return user;
    }

    return isPasswordValid ? user : null;
  }

  /**
   * Crear nuevo usuario (la contraseña se encripta antes de guardar)
   */
  async create(dto: {
    userName: string;
    userLastname: string;
    email?: string;
    password: string;
    userRole_iduserRole?: number;
    userStatus_iduserStatus?: number;
    company_idcompany?: number;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      userRole_iduserRole: dto.userRole_iduserRole ?? 1,
      userStatus_iduserStatus: dto.userStatus_iduserStatus ?? 1,
      company_idcompany: dto.company_idcompany ?? 2,
    });

    return await this.userRepo.save(newUser);
  }

  /**
   * Obtener todos los usuarios
   */
  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  // 🔁 Alias para compatibilidad con código en español
  validar(nombreUsuario: string, contrasena: string) {
    return this.validate(nombreUsuario, contrasena);
  }

  crear(dto: any) {
    return this.create(dto);
  }

  obtenerTodos() {
    return this.findAll();
  }
}
