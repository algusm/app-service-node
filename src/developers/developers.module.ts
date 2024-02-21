import { Module } from '@nestjs/common';
import { DevelopersRepository } from './developers.repository';

@Module({
    providers: [DevelopersRepository],
    exports: [DevelopersRepository]
})
export class DevelopersModule {}
