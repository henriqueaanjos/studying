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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let ContentService = class ContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createContents(data) {
        const createdContents = [];
        for (const contentData of data) {
            const contentExists = await this.prisma.content.findFirst({
                where: {
                    numberContent: contentData.numberContent,
                    lessonId: contentData.lessonId,
                },
            });
            if (contentExists) {
                throw new common_1.BadRequestException(`Content already exists: Lesson ID ${contentData.lessonId}, Number Content ${contentData.numberContent}`);
            }
            const content = await this.prisma.content.create({
                data: {
                    numberContent: contentData.numberContent,
                    durationSeconds: contentData.durationSeconds,
                    lessonId: contentData.lessonId,
                    contentTypeId: contentData.contentTypeId,
                },
            });
            createdContents.push(content);
        }
        return createdContents;
    }
    async create(data) {
        const contentExists = await this.prisma.content.findFirst({
            where: {
                numberContent: data.numberContent,
                lessonId: data.lessonId,
            },
        });
        if (contentExists) {
            throw new common_1.BadRequestException('Content already exists');
        }
        const content = await this.prisma.content.create({
            data: {
                numberContent: data.numberContent,
                durationSeconds: data.durationSeconds,
                lessonId: data.lessonId,
                contentTypeId: data.contentTypeId,
            },
        });
        return content;
    }
    async findAll() {
        return this.prisma.content.findMany();
    }
    async findOne(id) {
        return this.prisma.content.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id, data) {
        return this.prisma.content.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id) {
        return this.prisma.content.delete({
            where: {
                id,
            },
        });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map