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
exports.StudySessionService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let StudySessionService = class StudySessionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateSession(idContest) {
        const contest = await this.prisma.contest.findUnique({
            where: { id: idContest },
            include: {
                Discipline: {
                    include: {
                        Lesson: {
                            include: {
                                Content: {
                                    include: {
                                        Register: true,
                                        contentType: true,
                                    },
                                },
                                stage: true,
                            },
                        },
                    },
                },
            },
        });
        if (!contest) {
            throw new common_1.BadRequestException('Contest not found');
        }
        const timeToStudyInSeconds = contest.dedicationHours * 3600 || 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const allContents = contest.Discipline.flatMap((discipline) => discipline.Lesson.flatMap((lesson) => lesson.Content.filter((content) => {
            if (!content.Register || content.Register.length === 0)
                return true;
            const lastRegister = content.Register[content.Register.length - 1];
            const registerDate = new Date(lastRegister.registeredAt);
            registerDate.setHours(0, 0, 0, 0);
            return registerDate.getTime() === today.getTime();
        }).map((content) => ({
            ...content,
            disciplineName: discipline.name,
            disciplineColor: discipline.color,
            numberLesson: lesson.numberLesson,
            stageName: lesson.stage.name,
            contentTypeName: content.contentType.name,
            contentTypeId: content.contentType.id,
        }))));
        allContents.sort((a, b) => {
            if (a.disciplineName === b.disciplineName) {
                return a.numberLesson - b.numberLesson;
            }
            return a.disciplineName.localeCompare(b.disciplineName);
        });
        const { selectedContents } = allContents.reduce((acc, content) => {
            const duration = content.durationSeconds || content.durationSeconds || 0;
            if (acc.accumulatedTime + duration > timeToStudyInSeconds)
                return acc;
            return {
                accumulatedTime: acc.accumulatedTime + duration,
                selectedContents: [...acc.selectedContents, content],
            };
        }, { accumulatedTime: 0, selectedContents: [] });
        return selectedContents;
    }
    async generateStudyPlan(idContest) {
        const contest = await this.prisma.contest.findUnique({
            where: { id: idContest },
            include: {
                Discipline: {
                    include: {
                        Lesson: {
                            include: {
                                Content: true,
                            },
                        },
                    },
                },
            },
        });
        if (!contest) {
            throw new common_1.BadRequestException('Contest not found');
        }
        const timeToStudyInSeconds = contest.dedicationHours * 3600 || 0;
        const allContents = contest.Discipline.flatMap((discipline) => discipline.Lesson.flatMap((lesson) => lesson.Content.map((content) => ({
            ...content,
            disciplineName: discipline.name,
            numberLesson: lesson.numberLesson,
        }))));
        allContents.sort((a, b) => {
            if (a.disciplineName === b.disciplineName) {
                return a.numberLesson - b.numberLesson;
            }
            return a.disciplineName.localeCompare(b.disciplineName);
        });
        const studyPlan = allContents.reduce((acc, content) => {
            const duration = content.durationSeconds || content.durationSeconds || 0;
            const lastBlock = acc.blocks[acc.blocks.length - 1];
            const accumulatedTime = lastBlock?.contents.reduce((sum, c) => sum + (c.durationSeconds || c.durationSeconds || 0), 0);
            if (!lastBlock || accumulatedTime + duration > timeToStudyInSeconds) {
                const newDate = new Date(acc.currentDate);
                if (lastBlock)
                    newDate.setDate(newDate.getDate() + 1);
                return {
                    currentDate: newDate,
                    blocks: [...acc.blocks, { date: newDate, contents: [content] }],
                };
            }
            lastBlock.contents.push(content);
            return acc;
        }, {
            currentDate: new Date(),
            blocks: [],
        }).blocks;
        if (studyPlan.length > 0) {
            studyPlan.push({ date: new Date(), contents: [] });
        }
        return studyPlan;
    }
    async getContentsByDate(idContest, date) {
        const studyPlan = await this.generateStudyPlan(idContest);
        const targetDate = new Date(date);
        const day = targetDate.getDate();
        const month = targetDate.getMonth();
        const year = targetDate.getFullYear();
        const dayBlock = studyPlan.find((block) => {
            const blockDate = new Date(block.date);
            return (blockDate.getDate() === day &&
                blockDate.getMonth() === month &&
                blockDate.getFullYear() === year);
        });
        return dayBlock ? dayBlock.contents : [];
    }
};
exports.StudySessionService = StudySessionService;
exports.StudySessionService = StudySessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], StudySessionService);
//# sourceMappingURL=study-session.service.js.map