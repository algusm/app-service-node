import { Injectable, NotFoundException } from "@nestjs/common";
import { DevelopersRepository } from "./developers.repository";

@Injectable()
export class DevelopersService {

    constructor(private readonly developersRepository: DevelopersRepository) {}

    checkIfDeveloperExists(developerId: number) {
        if (!this.developersRepository.findById(developerId))
            throw new NotFoundException()
    }

}