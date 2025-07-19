import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class OptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiPropertyOptional()
  @IsOptional()
  isCorrect?: boolean;
}

export class QuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ enum: QuestionType })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiPropertyOptional({ description: 'Only for BOOLEAN questions' })
  @ValidateIf((q: QuestionDto) => q.type === QuestionType.BOOLEAN)
  @IsNotEmpty()
  correctBoolean?: boolean;

  @ApiPropertyOptional({ description: 'Only for INPUT questions' })
  @ValidateIf((q: QuestionDto) => q.type === QuestionType.INPUT)
  @IsString()
  @IsNotEmpty()
  correctAnswer?: string;

  @ApiPropertyOptional({
    type: [OptionDto],
    description: 'Only for CHECKBOX questions',
  })
  @ValidateIf((q: QuestionDto) => q.type === QuestionType.CHECKBOX)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options?: OptionDto[];
}

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [QuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
