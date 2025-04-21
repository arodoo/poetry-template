import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
  
  @Column({ nullable: true, default: 'local' })
  authProvider: string;
  
  @Column({ default: 0 })
  loginCount: number;
  
  @Column({ nullable: true })
  invitedByUserId: string;

  @Column({ type: 'jsonb', nullable: true, default: () => "'{}'" })
  metadata: Record<string, any>;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true, default: null })
  verificationToken: string;

  @Column({ nullable: true, default: null })
  resetPasswordToken: string;

  @Column({ nullable: true, default: null })
  resetPasswordExpires: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true, default: null })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}