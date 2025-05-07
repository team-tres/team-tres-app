/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, data } = body;

    if (!action || !Array.isArray(data)) {
      return NextResponse.json(
        { message: 'Invalid request format' },
        { status: 400 },
      );
    }

    if (action === 'pending form') {
      await Promise.all(
        data.map(async (item) => {
          const user = await prisma.user.update({
            where: { id: item.userId },
            data: { status: item.status },
          });

          if (item.action && user.companyIni) {
            let company = await prisma.company.findFirst({
              where: { name: user.companyIni },
            });

            if (!company) {
              company = await prisma.company.create({
                data: { name: user.companyIni },
              });
            }

            await prisma.user.update({
              where: { id: item.userId },
              data: { companyId: company.id },
            });
          }
        }),
      );
    } else if (action === 'manage form') {
      await Promise.all(
        data.map(async (item) => {
          if (item.delete) {
            await prisma.user.delete({ where: { id: item.userId } });
          } else if (item.role) {
            await prisma.user.update({
              where: { id: item.userId },
              data: { role: item.role as Role },
            });
          }
        }),
      );
    } else if (action === 'update client') {
      await Promise.all(
        data.map(async (item) => {
          if (item.companyId) {
            await prisma.user.update({
              where: { id: item.userId },
              data: { companyId: item.companyId },
            });
          }
        }),
      );
    } else if (action === 'create company') {
      await Promise.all(
        data.map(async (item) => {
          const existing = await prisma.company.findFirst({
            where: { name: item.name },
          });

          if (!existing) {
            await prisma.company.create({
              data: { name: item.name },
            });
          }
        }),
      );
    } else if (action === 'update company') {
      await Promise.all(
        data.map(async (item) => {
          if (item.delete) {
            // Set all related users' companyId to null
            await prisma.user.updateMany({
              where: { companyId: item.companyId },
              data: { companyId: null },
            });

            // Delete the company
            await prisma.company.delete({
              where: { id: item.companyId },
            });
          } else if (item.name && item.companyId) {
            // Check if the name is already taken by another company
            const existing = await prisma.company.findFirst({
              where: {
                name: item.name,
                NOT: { id: item.companyId },
              },
            });

            if (!existing) {
              await prisma.company.update({
                where: { id: item.companyId },
                data: { name: item.name },
              });
            }
          }
        }),
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid action type' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: 'User(s) updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating user(s):', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 },
    );
  }
}
