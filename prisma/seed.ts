import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //* * Phat's logic for new data seeding */
  const users = [
    { email: 'client@gmail.com',
      username: 'client',
      password: 'password',
      role: Role.CLIENT,
      companyIni: 'Company 1',
      status: true,
    },
    { email: 'admin@gmail.com',
      username: 'admin',
      password: 'password',
      role: Role.ADMIN,
      status: true },
    {
      email: 'analyst@gmail.com',
      username: 'analyst',
      password: 'password',
      role: Role.ANALYST,
      companyIni: 'Company 1',
      status: true,

    },
    {
      email: 'auditor@gmail.com',
      username: 'auditor',
      password: 'password',
      role: Role.AUDITOR,
      companyIni: 'Company 1',
      status: true,

    },
  ];

  const companies = [
    { name: 'Company 1' },
    { name: 'Company 2' },
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
        status: user.status,
        companyIni: user.companyIni,
      },
      create: {
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
        status: user.status,
        companyIni: user.companyIni,

      },
    });
  }

  for (const company of companies) {
    await prisma.company.upsert({
      where: { name: company.name },
      update: {
      },
      create: {
        name: company.name,
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
