/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, newUsername } = await req.json();

  try {
    await prisma.user.update({
      where: { email },
      data: { username: newUsername },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Username update error:', error);
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}
