import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContestModule } from './modules/contest/contest.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { TopicModule } from './modules/topic/topic.module';
import { StageModule } from './modules/stage/stage.module';
import { ContentTypeModule } from './modules/content-type/content-type.module';
import { ContentModule } from './modules/content/content.module';
import { RegisterModule } from './modules/register/register.module';
import { StudySessionModule } from './modules/study-session/study-session.module';
import { HelloController } from './modules/hello.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ContestModule,
    DisciplineModule,
    LessonModule,
    TopicModule,
    StageModule,
    ContentTypeModule,
    ContentModule,
    RegisterModule,
    StudySessionModule,
  ],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}
