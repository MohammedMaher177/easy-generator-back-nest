import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/jwt.strategy.ts';
import { getEnv } from 'src/config.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || "JWT_SECRET",
        signOptions: { expiresIn: '7h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  controllers: [AuthController],
})
export class AuthModule { }
