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
exports.ContestService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let ContestService = class ContestService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, userId) {
        const contestExits = await this.prisma.contest.findFirst({
            where: {
                companyName: data.companyName,
                position: data.position,
                userId: userId,
            },
        });
        if (contestExits) {
            throw new common_1.BadRequestException('Contest already exists');
        }
        const localDate = new Date(data.exameDate);
        const offsetMs = localDate.getTimezoneOffset() * 60 * 1000;
        const adjustedDate = new Date(localDate.getTime() + offsetMs);
        const contest = await this.prisma.contest.create({
            data: {
                ...data,
                exameDate: adjustedDate,
                userId: userId,
            },
        });
        return contest;
    }
    async findAll(userId) {
        return this.prisma.contest.findMany({
            where: {
                userId,
            },
            include: {
                Discipline: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.contest.findUnique({
            where: {
                id,
            },
            include: {
                Discipline: true,
            },
        });
    }
    async update(id, data) {
        return this.prisma.contest.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id) {
        return this.prisma.contest.delete({
            where: {
                id,
            },
        });
    }
};
exports.ContestService = ContestService;
exports.ContestService = ContestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], ContestService);
//# sourceMappingURL=contest.service.js.map