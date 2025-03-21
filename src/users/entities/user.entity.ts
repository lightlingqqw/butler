import { Programme } from 'src/programme/entities/programme.entity';
import { Relationship } from 'src/relationship/entities/relationship.entity';
import { Role } from 'src/roles/enums/role.enum';
import { Tag } from 'src/tag/entities/tag.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';

  
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid') // 自动生成 UUID 作为主键
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false }) // 昵称 
    nickname: string;

    @Column({ type: 'varchar', length: 255, nullable: true }) // 头像 URL，允许为空
    avatar: string;

    @Column({ type: 'enum', enum: Role, default: Role.User }) // 角色，默认值为 'user'
    role: Role;

    @OneToMany(() => Programme, (programme) => programme.user)
    programme: Programme[];

    @OneToMany(() => Tag, (tag) => tag.user)
    tag: Tag[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

        // 用户作为朋友关系中的发起者
    @OneToMany(() => Relationship, (relationship) => relationship.fromUser)
    fromRelationships: Relationship[];

    // 用户作为朋友关系中的接受者
    @OneToMany(() => Relationship, (relationship) => relationship.toUser)
    toRelationships: Relationship[];
    
}
