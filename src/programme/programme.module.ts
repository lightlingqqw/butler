import { Module } from '@nestjs/common';
import { ProgrammeService } from './programme.service';
import { ProgrammeController } from './programme.controller';
import { UsersModule } from 'src/users/users.module';
import { Programme } from './entities/programme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule .forFeature([Programme]),UsersModule],
  controllers: [ProgrammeController],
  providers: [ProgrammeService],
  exports: [ProgrammeService, TypeOrmModule.forFeature([Programme])], 
})
export class ProgrammeModule {}
