import { Module } from '@nestjs/common';
import { ApiMongooseFeaturesService } from './api-mongoose-features.service';

@Module({
  providers: [ApiMongooseFeaturesService],
  exports: [ApiMongooseFeaturesService],
})
export class ApiMongooseFeaturesModule {}
