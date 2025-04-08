import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Tenants module for the Poetry SaaS platform
 * Handles multi-tenancy, tenant management, and isolation between customers
 */
@Module({
  imports: [
    // TypeOrmModule.forFeature([Tenant]), // Uncomment when Tenant entity is created
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TenantsModule {}
