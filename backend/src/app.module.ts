import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { CardModule } from './modules/card/card.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    AuthModule,
    UsersModule,
    ProjectModule,
    CardModule,
  ],
})
export class AppModule {}
