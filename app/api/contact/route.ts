import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { name, email, phone, propertyValue, monthlySalary } = data;

    // Optional: Basic validation
    if (!name || !email || !phone || !propertyValue || !monthlySalary) {
      return NextResponse.json(
        { status: 'error', message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Here you could save the lead to a database or send an email

    return NextResponse.json({
      status: 'success',
      message: 'Lead received',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 'error', message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
