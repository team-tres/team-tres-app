import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Handle API logic for company names
export async function GET() {
    try {
      // Fetch unique company names
      const companies = await prisma.company.findMany({
        select: { name: true },
      });
  
      // Return only company names
      const companyNames = companies.map((company) => company.name);
  
      return NextResponse.json(companyNames);
    } catch (error) {
      console.error('Error fetching company names:', error);
      return NextResponse.json({ error: 'Failed to fetch company names' }, { status: 500 });
    }
  }
  
  
  export async function POST(req: Request) {
    try {
      const { email, role, companyName } = await req.json();
  
      if (!email || !role || !companyName) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Check if company already exists
      const existingCompany = await prisma.user.findFirst({ where: { companyName } });
  
      if (!existingCompany) {
        console.log(`New company added: ${companyName}`);
      }
  
      // Store user with company name
      const newUser = await prisma.user.create({
        data: { email, role, companyName },
      });
  
      return NextResponse.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error saving user:', error);
      return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
    }
  }