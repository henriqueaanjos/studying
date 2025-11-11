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
exports.DisciplineService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
;
let DisciplineService = class DisciplineService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const disciplineExists = await this.prisma.discipline.findFirst({
            where: {
                name: data.name,
                contestId: data.contestId,
            },
        });
        if (disciplineExists) {
            throw new common_1.BadRequestException('Discipline already exists');
        }
        const discipline = await this.prisma.discipline.create({
            data,
        });
        return discipline;
    }
    async findAll() {
        const disciplines = await this.prisma.discipline.findMany({
            include: {
                Lesson: {
                    include: {
                        Content: {
                            include: {
                                Register: true,
                            },
                        },
                    },
                },
            },
        });
        return disciplines.map((discipline) => {
            const lessons = discipline.Lesson || [];
            const totalLessons = lessons.length;
            const totalContents = lessons.reduce((sum, lesson) => sum + (lesson.Content?.length || 0), 0);
            const allContents = lessons.flatMap((lesson) => lesson.Content || []);
            const totalDuration = allContents.reduce((sum, content) => sum + (content.durationSeconds || 0), 0);
            const completedContents = allContents.filter((content) => content.Register && content.Register.length > 0).length;
            const completedDuration = allContents.reduce((sum, content) => {
                if (content.Register && content.Register.length > 0) {
                    return sum + (content.durationSeconds || 0);
                }
                return sum;
            }, 0);
            return {
                ...discipline,
                totalLessons,
                totalContents,
                totalDuration,
                completedContents,
                completedDuration,
            };
        });
    }
    async findOne(id) {
        const discipline = await this.prisma.discipline.findUnique({
            where: {
                id,
            },
            include: {
                Lesson: {
                    include: {
                        Content: {
                            include: {
                                Register: true,
                            },
                        },
                    },
                },
            },
        });
        if (!discipline) {
            throw new common_1.BadRequestException('Discipline not found');
        }
        const lessons = discipline.Lesson || [];
        const totalLessons = lessons.length;
        const totalContents = lessons.reduce((sum, lesson) => sum + (lesson.Content?.length || 0), 0);
        const allContents = lessons.flatMap((lesson) => lesson.Content || []);
        const totalDuration = allContents.reduce((sum, content) => sum + (content.durationSeconds || 0), 0);
        const completedContents = allContents.filter((content) => content.Register && content.Register.length > 0).length;
        const completedDuration = allContents.reduce((sum, content) => {
            if (content.Register && content.Register.length > 0) {
                return sum + (content.durationSeconds || 0);
            }
            return sum;
        }, 0);
        return {
            ...discipline,
            totalLessons,
            totalContents,
            totalDuration,
            completedContents,
            completedDuration,
        };
    }
    async update(id, data) {
        return this.prisma.discipline.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id) {
        return this.prisma.discipline.delete({
            where: {
                id,
            },
        });
    }
};
exports.DisciplineService = DisciplineService;
exports.DisciplineService = DisciplineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], DisciplineService);
//# sourceMappingURL=discipline.service.js.map