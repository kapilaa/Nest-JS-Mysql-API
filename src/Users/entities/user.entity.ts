import { Entity, 
         Column, 
         PrimaryGeneratedColumn 
        } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'block'], default: 'active' })
  status: string;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}