import { hash } from 'bcrypt';
import { Role, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hashedPassword = await hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        role: Role.CLIENT,
        companyIni: data.companyIni,
        status: false,
      },
    });
    return NextResponse.json({ username: user.username });
  } catch (error) {
    console.error('Error when signup for users', error);
    return NextResponse.error();
  }
}

// Adding a default export to satisfy ESLint's prefer-default-export rule.
// Next.js will still use the named export (POST) to handle the request.
const handler = { POST };
export default handler;
