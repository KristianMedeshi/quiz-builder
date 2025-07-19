import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prismaService: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { title, questions } = createQuizDto;

    return this.prismaService.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            type: q.type,
            correctBoolean: q.type === 'BOOLEAN' ? q.correctBoolean : undefined,
            correctAnswer: q.type === 'INPUT' ? q.correctAnswer : undefined,
            options:
              q.type === 'CHECKBOX' && q.options
                ? {
                    create: q.options.map((o) => ({
                      text: o.text,
                      isCorrect: o.isCorrect ?? false,
                    })),
                  }
                : undefined,
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.quiz.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prismaService.quiz.delete({ where: { id } });
  }
}
