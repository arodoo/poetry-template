import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Users module for the Poetry SaaS platform
 * Handles user management, profiles, and permissions
 */
@Module({
  imports: [
    // TypeOrmModule.forFeature([User]), // Uncomment when User entity is created
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UsersModule {}
