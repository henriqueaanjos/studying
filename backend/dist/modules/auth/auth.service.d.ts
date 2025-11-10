import { PrismaService } from '../../database/PrismaService';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    singIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
