import { AppsService } from "./apps.service";
import { AppsRepository } from "./apps.repository";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { DevelopersService } from "src/developers/developers.service";
import { DevelopersRepository } from "src/developers/developers.repository";

describe('AppsService', () => {

    let appsService: AppsService;
    let appsRepository : AppsRepository;
    let developersService: DevelopersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [AppsService, AppsRepository, DevelopersService, DevelopersRepository]
          }).compile();
    
        appsService = moduleRef.get<AppsService>(AppsService);
        appsRepository = moduleRef.get<AppsRepository>(AppsRepository);
        developersService = moduleRef.get<DevelopersService>(DevelopersService);
    })

    describe('createApp', () => {
        it('should create an app sucessfully', async () => {
            const app = {name : 'WeatherApp', packageName : 'com.example.weatherapp',  description : 'A Weather App', developerId: 123456}

            jest.spyOn(appsRepository, 'findByPackageName').mockImplementation(() => undefined)
            jest.spyOn(developersService, 'checkIfDeveloperExists').mockImplementation(() => {})
            jest.spyOn(appsRepository, 'save').mockImplementation(() => {})

            appsService.createApp(app)

            expect(appsRepository.save).toHaveBeenCalled()
        })
    }) 

    describe('createApp with existing package name', () => {
        it('should throw ConflictException', () => {
            const app = {name : 'WeatherApp', packageName : 'com.example.weatherapp',  description : 'A Weather App', developerId: 123456}

            function create() {
                appsService.createApp(app)  
            }

            jest.spyOn(developersService, 'checkIfDeveloperExists').mockImplementation(() => {})
            jest.spyOn(appsRepository, 'findByPackageName').mockImplementation(() => app)

            expect(create).toThrow(ConflictException)
        }) 

    })

    describe('createApp with nonexistant developer id', () => {
        it('should throw NotFoundException', () => {
            const app = {name : 'WeatherApp', packageName : 'com.example.weatherapp',  description : 'A Weather App', developerId: 234567}

            function create() {
                appsService.createApp(app)  
            }

            jest.spyOn(developersService, 'checkIfDeveloperExists').mockImplementation(() => {throw new NotFoundException})

            expect(create).toThrow(NotFoundException)
        })
    })

})