import { Injectable } from "@nestjs/common"

@Injectable()
export class AppsRepository {

    apps : App[] 

    constructor() {
        this.apps = []
    }

    save(app : App) {
        this.apps.push(app)
    }

    list() {
        return this.apps
    }

    findByPackageName(packageName : string) {
        return this.apps.find(app => app.packageName == packageName)
    }
    
}