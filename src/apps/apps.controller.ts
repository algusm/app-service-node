import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppsService } from './apps.service';

@Controller('app')
export class AppsController {

    constructor(private readonly appsService : AppsService) {}

    @Post()
    createApp(@Body() app : App) {
        this.appsService.createApp(app)
    }

    @Get()
    listApps() {
        return this.appsService.listApps()
    }

}