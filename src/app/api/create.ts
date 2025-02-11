import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
      const { email, role, companyName } = await req.json();
  
      if (!email || !role || !companyName) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Check if company exists
      let company = await prisma.company.findFirst({
        where: { name: companyName },
      });
  
      // If company doesn't exist, create it
      if (!company) {
        company = await prisma.company.create({
          data: { name: companyName },
        });
        console.log(`New company added: ${companyName}`);
      }
  
      // Create new user with associated company
      const newUser = await prisma.user.create({
        data: {
          email,
          role,
          companyId: company.id, // Store company ID instead of text
        },
      });
  
      return NextResponse.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error saving user:', error);
      return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
    }
  }
  