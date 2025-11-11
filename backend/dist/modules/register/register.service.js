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
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
;
let RegisterService = class RegisterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const registerExists = await this.prisma.register.findFirst({
            where: {
                contentId: data.contentId,
            },
        });
        if (registerExists) {
            return await this.remove(registerExists.id);
        }
        const register = await this.prisma.register.create({
            data,
        });
        return register;
    }
    async findAll() {
        return this.prisma.register.findMany({
            include: {
                content: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.register.findUnique({
            where: {
                id,
            },
            include: {
                content: true,
            },
        });
    }
    async update(id, data) {
        return this.prisma.register.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id) {
        return this.prisma.register.delete({
            where: {
                id,
            },
        });
    }
};
exports.RegisterService = RegisterService;
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], RegisterService);
//# sourceMappingURL=register.service.js.map