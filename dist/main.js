"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("/api");
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle(process.env.SWAGGER_API_TITLE)
        .setDescription(process.env.SWAGGER_API_DESCRIPTION)
        .setVersion('1.0')
        .addTag(process.env.SWAGGER_API_TITLE)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map