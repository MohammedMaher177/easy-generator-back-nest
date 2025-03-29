import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IAccessTokenPayload } from './interfaces/payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.usersService.findByEmail(email);

    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user.toObject()

      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateToken(token: string): Promise<IAccessTokenPayload> {
    try {
      if (!token) {
        throw new ForbiddenException('No token provided');
      }
      const payload: IAccessTokenPayload = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(user: any) {
    const payload = { email: user.email, _id: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);
    return this.login(user);
  }
}
