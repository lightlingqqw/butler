import { Controller, Get, Post, Body, Patch, Param, Delete,Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.createUser(userData.nickname, userData.avatar, userData.role);
  }

  @Roles(Role.Admin)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<User> {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
