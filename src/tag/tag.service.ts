import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Programme } from 'src/programme/entities/programme.entity';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Programme)
    private readonly programmeRepository: Repository<Programme>,
  ) {}

  async create(createTagDto: CreateTagDto&{user_id:string}): Promise<Tag> {
    const { user_id, programme_id, tagName, deadline } = createTagDto; 

    // 检查用户是否存在
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // 检查项目是否存在
    const programme = await this.programmeRepository.findOne({
      where: { id: programme_id },
    });
    if (!programme) {
      throw new NotFoundException(`Programme with ID ${programme_id} not found`);
    }

    // 创建标签
    const tag = new Tag();
    tag.user_id = user_id;
    tag.programme_id = programme_id;
    tag.tagName = tagName;
    tag.deadline = deadline;
    tag.user = user; // 关联用户
    tag.programme = programme; // 关联项目

    // 保存标签
    return this.tagRepository.save(tag);
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
