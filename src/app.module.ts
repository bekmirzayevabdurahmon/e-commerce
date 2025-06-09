import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, CategoryModule, OrderModule, ProductModule, UserModule } from './modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URL ? 'mongodb://localhost:27017/electronics_website' : 'mongodb://localhost:27017/electronics_website'
    ),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
