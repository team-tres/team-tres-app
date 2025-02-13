
import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

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

  console.log('Seeding the database');
  //   const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    // let role: Role = 'USER';
    if (account.role === 'ADMIN') {
    //   role = 'ADMIN';
    }
    // console.log(`  Creating user: ${account.email} with role: ${role}`);
    // await prisma.user.upsert({
    //   where: { email: account.email },
    //   update: {},
    //   create: {
    //     email: account.email,
    //     password,
    // role,
    //   },
    // });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else {
      condition = 'fair';
    }
    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        income: 0,
        condition,
      },
    });
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
