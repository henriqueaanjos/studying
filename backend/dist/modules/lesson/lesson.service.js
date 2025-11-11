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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
;
let LessonService = class LessonService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const lessonExists = await this.prisma.lesson.findFirst({
            where: {
                numberLesson: data.numberLesson,
                disciplineId: data.disciplineId,
            },
        });
        if (lessonExists) {
            throw new common_1.BadRequestException('Lesson already exists');
        }
        const lesson = await this.prisma.lesson.create({
            data: {
                numberLesson: data.numberLesson,
                disciplineId: data.disciplineId,
                stageId: data.stageId,
            },
        });
        return lesson;
    }
    async findAll() {
        const lessons = await this.prisma.lesson.findMany({
            include: {
                discipline: true,
                Content: {
                    include: {
                        Register: true,
                        contentType: true,
                    },
                },
                Topic: true,
            },
        });
        return lessons.map((lesson) => {
            const contents = lesson.Content || [];
            const topicTitles = lesson.Topic.map((topic) => topic.name);
            const contentTypes = [
                ...new Set(contents.map((content) => content.contentType.name)),
            ];
            const totalContents = contents.length;
            const totalDuration = contents.reduce((sum, content) => sum + (content.durationSeconds || 0), 0);
            const completedContents = contents.filter((content) => content.Register && content.Register.length > 0).length;
            const completedDuration = contents.reduce((sum, content) => {
                if (content.Register && content.Register.length > 0) {
                    return sum + (content.durationSeconds || 0);
                }
                return sum;
            }, 0);
            return {
                ...lesson,
                contentTypes,
                topicTitles,
                totalContents,
                totalDuration,
                completedContents,
                completedDuration,
            };
        });
    }
    async findOne(id) {
        const lesson = await this.prisma.lesson.findUnique({
            where: {
                id,
            },
            include: {
                Content: {
                    include: {
                        Register: true,
                        contentType: true,
                    },
                },
                Topic: true,
            },
        });
        if (!lesson) {
            throw new common_1.BadRequestException('Lesson not found');
        }
        const contents = lesson.Content || [];
        const topicTitles = lesson.Topic.map((topic) => topic.name);
        const contentTypes = [
            ...new Set(contents.map((content) => content.contentType.name)),
        ];
        const totalContents = contents.length;
        const totalDuration = contents.reduce((sum, content) => sum + (content.durationSeconds || 0), 0);
        const completedContents = contents.filter((content) => content.Register && content.Register.length > 0).length;
        const completedDuration = contents.reduce((sum, content) => {
            if (content.Register && content.Register.length > 0) {
                return sum + (content.durationSeconds || 0);
            }
            return sum;
        }, 0);
        return {
            ...lesson,
            contentTypes,
            topicTitles,
            totalContents,
            totalDuration,
            completedContents,
            completedDuration,
        };
    }
    async update(id, data) {
        return this.prisma.lesson.update({
            where: {
                id,
            },
            data,
        });
    }
    async remove(id) {
        return this.prisma.lesson.delete({
            where: {
                id,
            },
        });
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], LessonService);
//# sourceMappingURL=lesson.service.js.map