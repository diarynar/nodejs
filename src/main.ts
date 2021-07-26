import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api");
	app.enableCors();
	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle(process.env.SWAGGER_API_TITLE)
		.setDescription(process.env.SWAGGER_API_DESCRIPTION)
		.setVersion('1.0')
		.addTag(process.env.SWAGGER_API_TITLE)
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	await app.listen(process.env.PORT || 3000);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
