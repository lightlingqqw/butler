import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class Relationship {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.fromRelationships)
    @JoinColumn({ name: 'from_user_id' })
    fromUser: User;
  
    @ManyToOne(() => User, (user) => user.toRelationships)
    @JoinColumn({ name: 'to_user_id' })
    toUser: User;
  
    @Column({ default: false })
    isAccepted: boolean; // 是否已接受朋友请求
}
