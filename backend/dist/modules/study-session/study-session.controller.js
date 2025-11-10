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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudySessionController = void 0;
const common_1 = require("@nestjs/common");
const study_session_service_1 = require("./study-session.service");
const auth_guard_1 = require("../auth/auth.guard");
let StudySessionController = class StudySessionController {
    studySessionService;
    constructor(studySessionService) {
        this.studySessionService = studySessionService;
    }
    generateSession(id) {
        return this.studySessionService.generateSession(id);
    }
    generateStudyPlan(id) {
        return this.studySessionService.generateStudyPlan(id);
    }
    getContentsByDate(id, date) {
        return this.studySessionService.getContentsByDate(id, new Date(date));
    }
};
exports.StudySessionController = StudySessionController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id/session'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudySessionController.prototype, "generateSession", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id/plan'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudySessionController.prototype, "generateStudyPlan", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id/by-date'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StudySessionController.prototype, "getContentsByDate", null);
exports.StudySessionController = StudySessionController = __decorate([
    (0, common_1.Controller)('study-session'),
    __metadata("design:paramtypes", [study_session_service_1.StudySessionService])
], StudySessionController);
//# sourceMappingURL=study-session.controller.js.map