import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  //start firebase credentials
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://fiestacerca-ws-default-rtdb.firebaseio.com',
  });

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
