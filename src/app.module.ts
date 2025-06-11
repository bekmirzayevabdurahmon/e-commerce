import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, CategoryModule, OrderModule, ProductModule, UserModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URL ? 'mongodb://localhost:27017/electronics_website' : 'mongodb://localhost:27017/electronics_website'
    ),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        renderPath: '/',
      },
      {
        rootPath: join(__dirname, '..', 'uploads'),
        renderPath: '/uploads',
      },
    ),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
