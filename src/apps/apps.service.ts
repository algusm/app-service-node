import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AppsRepository } from './apps.repository';
import { DevelopersRepository } from 'src/developers/developers.repository';

@Injectable()
export class AppsService {

    constructor(
        private readonly appsRepository : AppsRepository,
        private readonly developersRepository: DevelopersRepository
    ) {}

    createApp(app : App) {
        this.checkIfDeveloperExists(app.developerId)
        this.checkIfAppExists(app)

        this.appsRepository.save(app)
    }

    private checkIfDeveloperExists(developerId: number) {
        if (!this.developersRepository.findById(developerId))
            throw new NotFoundException()
    }

    private checkIfAppExists(app: App) {
        if (this.appsRepository.findByPackageName(app.packageName))
            throw new ConflictException()
    }

    listApps() {
        return this.appsRepository.list()
    }

}