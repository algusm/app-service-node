import { Injectable } from "@nestjs/common";

@Injectable()
export class DevelopersRepository {

    developers: Developer[]

    constructor() {
        this.developers = [{id: 123456, name: 'Nice Dev', email: 'nicedev@gmail.com'}]
    }

    findById(id: number) {
        return this.developers.find(developer => developer.id == id)
    }

}