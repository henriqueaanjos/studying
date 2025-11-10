import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { setRedis } from '../../libs/redisConfig';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    await setRedis(`user-${user.id}`, JSON.stringify(user));

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
