import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { AppsRepository } from './apps.repository';
import { DevelopersModule } from 'src/developers/developers.module';

@Module({
    controllers : [AppsController], 
    providers : [AppsService, AppsRepository],
    imports: [DevelopersModule]
})
export class AppsModule {}
