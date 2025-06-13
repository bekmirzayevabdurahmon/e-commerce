"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http:/localhost:3000',
        methods: 'GET POST PUT PATCH DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce Electronics API')
        .setDescription('Ecommerce Electronics API description')
        .setVersion('1.0')
        .addTag('electronics')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
    await app.listen(port, () => {
        console.log(`Server runing on port ${port} ✅`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map