import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgrammeService } from './programme.service';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { Programme } from './entities/programme.entity';

@Controller('programme')
export class ProgrammeController {
  constructor(private readonly programmeService: ProgrammeService) {}

  @Post()
  create(@Body() createProgrammeDto: CreateProgrammeDto): Promise<Programme> {
    return this.programmeService.create(createProgrammeDto);
  }

  @Get()
  findAll() {
    return this.programmeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgrammeDto: UpdateProgrammeDto) {
    return this.programmeService.update(+id, updateProgrammeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmeService.remove(+id);
  }
}
