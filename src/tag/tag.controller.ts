import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { AuthGuard } from '@nestjs/passport';
import { getUserIdFromToken } from 'src/utils/jwt.utils';
import { Request } from 'express';

@Controller('tag')
@UseGuards(AuthGuard('jwt'))
export class TagController {
  constructor(private readonly tagService: TagService) {}


  @Post()
  create(@Req() req: Request, @Body() createTagDto: CreateTagDto): Promise<Tag> {

    console.log('req的值',req.rawHeaders);
    // 从 JWT Token 中提取 user_id
    // const user_id = req.user['userId']; // 根据 JWT 策略中的 validate 方法返回的字段名
    // // 将 user_id 添加到 createTagDto 中
    // const payload = { ...createTagDto, user_id };

    const user_id = getUserIdFromToken(req);
      // 将 user_id 添加到 createTagDto 中
      const payload = { ...createTagDto, user_id }

    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
