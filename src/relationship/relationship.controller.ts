import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { RelationshipService } from './relationship.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUserIdFromToken } from 'src/utils/jwt.utils';
import { Request } from 'express';

@Controller('relationship')
@UseGuards(AuthGuard('jwt'))
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  async createRelationship(
    @Req() req:Request, // 获取请求对象
    @Body('toUserId') toUserId: string, // 从请求体中获取 toUserId
  ) {

    const user_id = getUserIdFromToken(req);
    // console.log('req',req);
    console.log('自己的userid:',user_id);
    console.log('朋友的userid:',toUserId);
    return this.relationshipService.createRelationship(user_id, toUserId);
  }

  @Post(':id/accept')
  async acceptRelationship(@Param('id') relationshipId: number) {
    return this.relationshipService.acceptRelationship(relationshipId);
  }

  @Get(':userId/friends')
  async getFriends(@Param('userId') userId: string) {
    return this.relationshipService.getFriends(userId);
  }


}
