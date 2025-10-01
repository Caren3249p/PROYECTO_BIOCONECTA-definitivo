"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'biotec',
    password: 'oki31xdc!#biotec',
    database: 'mydb',
    entities: [usuarios_entity_1.Usuario],
    synchronize: true,
});
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map