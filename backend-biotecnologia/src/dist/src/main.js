"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_exception_filter_1 = require("./auth/auth-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new auth_exception_filter_1.AuthExceptionFilter());
    app.enableCors();
    await app.listen(3000);
    console.log(`Aplicación corriendo en: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map