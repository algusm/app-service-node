import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';
import { DevelopersModule } from './developers/developers.module';

@Module({
  imports: [AppsModule, DevelopersModule]
})
export class AppModule {}
