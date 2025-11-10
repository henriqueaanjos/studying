"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
const bcrypt = require("bcrypt");
const redisConfig_1 = require("../../libs/redisConfig");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const hashPassword = await bcrypt.hash(data.password, 10);
        const userExits = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });
        if (userExits) {
            throw new common_1.BadRequestException('User already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashPassword,
            },
        });
        await (0, redisConfig_1.setRedis)(`user-${user.id}`, JSON.stringify(user));
        return user;
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findOne(id) {
        const userRedis = await (0, redisConfig_1.getRedis)(`user-${id}`);
        if (userRedis) {
            return JSON.parse(userRedis);
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, data) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }
    async delete(id) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map