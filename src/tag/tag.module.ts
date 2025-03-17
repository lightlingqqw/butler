import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { UsersModule } from 'src/users/users.module';
import { ProgrammeModule } from 'src/programme/programme.module';

@Module({
  imports:[TypeOrmModule .forFeature([Tag]),UsersModule,ProgrammeModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {} 
