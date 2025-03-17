import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';

@Entity('programme')
export class Programme {

    @PrimaryGeneratedColumn('uuid') // 自动生成 UUID 作为主键
    id: string;

    @Column()
    name: string; // 确保字段类型和名称正确 

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' }) // 确保外键字段名称正确
    user: User;

    @Column({ default: '1' })
    user_id: string; // 确保字段类型和名称正确 

    @OneToMany(() => Programme, (programme) => programme.user)
    programme: Programme[];
  


    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
