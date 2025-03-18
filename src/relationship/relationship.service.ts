import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Relationship } from './entities/relationship.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipRepository: Repository<Relationship>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 创建朋友关系
  async createRelationship(fromUserId: string, toUserId: string) {
    const fromUser = await this.userRepository.findOne({ where: { id: fromUserId } });
    const toUser = await this.userRepository.findOne({ where: { id: toUserId } });

    if (!fromUser || !toUser) {
      throw new NotFoundException('User not found');
    }

    const relationship = this.relationshipRepository.create({
      fromUser,
      toUser,
      isAccepted: false, // 默认未接受
    });

    return this.relationshipRepository.save(relationship);
  }

  // 接受朋友请求
  async acceptRelationship(relationshipId: number) {

    console.log("传入的值",relationshipId)
    const relationship = await this.relationshipRepository.findOne({ where: { id: relationshipId } });
    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }

    relationship.isAccepted = true;
    return this.relationshipRepository.save(relationship);
  }

  // 获取用户的所有朋友
  async getFriends(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['fromRelationships', 'toRelationships'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const friends = [
      ...user.fromRelationships.filter((rel) => rel.isAccepted).map((rel) => rel.toUser),
      ...user.toRelationships.filter((rel) => rel.isAccepted).map((rel) => rel.fromUser),
    ];

    return friends;
  }
}
