import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TechniqueCategory {
  @PrimaryColumn({ name: 'category_id' })
  @ApiProperty()
  categoryId: number;
  @PrimaryColumn({ name: 'technique_id' })
  @ApiProperty()
  techniqueId: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
}
