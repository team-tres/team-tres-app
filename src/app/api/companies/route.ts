import { NextResponse } from 'next/server';
import getCompanies from '@/app/queries/admin/getCompanies';

export default async function GET() {
  try {
    const companies = await getCompanies();
    return NextResponse.json(companies);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
