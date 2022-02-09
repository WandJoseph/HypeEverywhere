import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConditionsModule } from './conditions/conditions.module';

@Module({
  imports: [UserModule, ConditionsModule],
})
export class UsersModule {}
