/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */

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
      // Update user status and assign company if necessary
      await Promise.all(
        data.map(async (item) => {
          // Update user status
          const user = await prisma.user.update({
            where: { id: item.userId },
            data: { status: item.action },
          });

          // If approved and user has `companyIni`, process company assignment
          if (item.action && user.companyIni) {
            // Check if company already exists
            let company = await prisma.company.findFirst({
              where: { name: user.companyIni },
            });

            // If company doesn't exist, create a new one
            if (!company) {
              company = await prisma.company.create({
                data: { name: user.companyIni },
              });
            }

            // Assign the company ID to the user
            await prisma.user.update({
              where: { id: item.userId },
              data: { companyId: company.id },
            });
          }
        }),
      );
    } else if (action === 'manage form') {
      // Handle role updates or user deletion
      await Promise.all(
        data.map(async (item) => {
          if (item.delete) {
            // Delete user
            await prisma.user.delete({ where: { id: item.userId } });
          } else if (item.role) {
            // Update role
            await prisma.user.update({
              where: { id: item.userId },
              data: { role: item.role as Role }, // Ensure role matches Prisma `Role` type
            });
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
