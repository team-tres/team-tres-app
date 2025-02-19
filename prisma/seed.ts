import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //* * Phat's logic for new data seeding */
  const users = [
    { email: 'client@gmail.com', username: 'client', password: 'password', role: Role.CLIENT },
    { email: 'admin@gmail.com', username: 'admin', password: 'password', role: Role.ADMIN },
    { email: 'analyst@gmail.com', username: 'analyst', password: 'password', role: Role.ANALYST },
    { email: 'auditor@gmail.com', username: 'auditor', password: 'password', role: Role.AUDITOR },
  ];

  const companies = [
    { name: 'Company 1', email: 'company1@gmail.com' },
    { name: 'Company 2', email: 'company2@gmail.com' },
  ];

  /* eslint-disable no-await-in-loop */
  //* * Seeding logic */
  for (const user of users) {
    user.password = await hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: user.password,
        username: user.username,
        role: user.role,
      },
      create: {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
      },
    });
  }

  for (const company of companies) {
    await prisma.company.upsert({
      where: { name: company.name },
      update: {
        email: company.email,
      },
      create: {
        name: company.name,
        email: company.email,
      },
    });
  }

  console.log('Seeding completed for Phat\'s Data!');

  //* * END  */
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
