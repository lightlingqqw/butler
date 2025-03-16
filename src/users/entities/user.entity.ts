import { Role } from 'src/roles/enums/role.enum';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
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

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
    
}
