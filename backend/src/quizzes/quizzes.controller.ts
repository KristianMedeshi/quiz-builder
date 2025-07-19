import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Return a list of all quizzes with titles and number of questions',
  })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return full details of a quiz including all questions',
  })
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz' })
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }
}
