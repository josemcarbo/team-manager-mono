import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../shared/encrypt/encrypt.service';
import { IUser } from '../users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private encryptService: EncryptService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(email: string, password: string): Promise<any> {
    if (!email || !password) throw new UnauthorizedException();

    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException();

    if (!(await this.encryptService.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async login(user: IUser) {
    const payload = { sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
