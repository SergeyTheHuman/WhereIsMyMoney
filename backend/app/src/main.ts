import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const port = configService.get('port')
	app.useGlobalPipes(new ValidationPipe())

	const configSwagger = new DocumentBuilder()
		.setTitle('WhereIsMyMoney api')
		.setDescription('This is an api for WhereIsMyMoney application')
		.setVersion('1.0')
		.build()

	const documentSwagger = SwaggerModule.createDocument(app, configSwagger)
	SwaggerModule.setup('api', app, documentSwagger)
	await app.listen(port, () =>
		console.log(`Server is listening on port ${port}`),
	)
}
bootstrap()
