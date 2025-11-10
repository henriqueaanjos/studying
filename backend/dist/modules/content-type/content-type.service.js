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
exports.ContentTypeService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let ContentTypeService = class ContentTypeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const contentTypeExists = await this.prisma.contentType.findFirst({
            where: {
                name: data.name,
            },
        });
        if (contentTypeExists) {
            throw new common_1.BadRequestException('Content Type already exists');
        }
        const contentType = await this.prisma.contentType.create({
            data,
        });
        return contentType;
    }
    async findAll() {
        return this.prisma.contentType.findMany();
    }
    async findOne(id) {
        return this.prisma.contentType.findUnique({
            where: {
                id,
            },
        });
    }
    async update(id, data) {
        return this.prisma.contentType.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id) {
        return this.prisma.contentType.delete({
            where: {
                id,
            },
        });
    }
};
exports.ContentTypeService = ContentTypeService;
exports.ContentTypeService = ContentTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], ContentTypeService);
//# sourceMappingURL=content-type.service.js.map