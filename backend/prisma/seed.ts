import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.quiz.create({
    data: {
      title: 'General Knowledge Quiz',
      questions: {
        create: [
          {
            text: 'Is the earth round?',
            type: 'BOOLEAN',
            correctBoolean: true,
          },
          {
            text: 'What is the capital city of Japan?',
            type: 'INPUT',
            correctAnswer: 'Tokyo',
          },
          {
            text: 'Select all prime numbers below:',
            type: 'CHECKBOX',
            options: {
              create: [
                { text: '2', isCorrect: true },
                { text: '3', isCorrect: true },
                { text: '4', isCorrect: false },
                { text: '5', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Quiz seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
