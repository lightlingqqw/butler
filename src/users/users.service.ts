import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/enums/role.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(nickname: string, avatar: string, role: Role): Promise<User> {
    const user = this.userRepository.create({ nickname, avatar, role });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
