import { Module ,MiddlewareConsumer} from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CurrentUserInterceptor } from './interceptor/current-user-interceptor';
import { RolesModule } from 'src/roles/roles.module';
import { CurrentUserMiddleware } from './middlewares/current-user-middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),RolesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // }
  ],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
 }
