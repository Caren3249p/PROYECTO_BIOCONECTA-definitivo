import { DataSource } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'biotec',            // Usuario principal
  password: 'oki31xdc!#biotec',  // Contraseña
  database: 'mydb',
  entities: [Usuario],
  synchronize: true,
});

export default dataSource;
