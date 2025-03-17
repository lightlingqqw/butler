import { Programme } from 'src/programme/entities/programme.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';


@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn('uuid') // 自动生成 UUID 作为主键
    id: string;

    @Column()
    tagName: string; // 确保字段类型和名称正确 

    @Column()
    deadline:string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' }) // 确保外键字段名称正确
    user: User;

    @Column({ default: '1' })
    user_id: string; // 确保字段类型和名称正确 

    @ManyToOne(() => Programme, (programme) => programme.id)
    @JoinColumn({ name: 'programme_id' }) // 确保外键字段名称正确
    programme: Programme;
  
    @Column({ default: '1' })
    programme_id: string; // 确保字段类型和名称正确 

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
