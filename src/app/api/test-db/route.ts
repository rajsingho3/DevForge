import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Test database connection by counting users
    const userCount = await db.user.count();
    
    return NextResponse.json({
      success: true,
      message: "Prisma is working properly!",
      userCount,
      database: "Connected to MongoDB"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
