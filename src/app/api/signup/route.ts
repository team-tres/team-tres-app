/* eslint-disable import/prefer-default-export */

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
    console.error('Error when signing up users', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
