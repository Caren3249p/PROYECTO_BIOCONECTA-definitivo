"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysUser = void 0;
const typeorm_1 = require("typeorm");
let SysUser = class SysUser {
    id;
    userName;
    userLastname;
    email;
    password;
};
exports.SysUser = SysUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idsysuser' }),
    __metadata("design:type", Number)
], SysUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userName' }),
    __metadata("design:type", String)
], SysUser.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userLastname' }),
    __metadata("design:type", String)
], SysUser.prototype, "userLastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], SysUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], SysUser.prototype, "password", void 0);
exports.SysUser = SysUser = __decorate([
    (0, typeorm_1.Entity)('sysuser')
], SysUser);
//# sourceMappingURL=sysuser.entity.js.map