import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch orders from Supabase
  return NextResponse.json({ orders: [] });
}

export async function POST() {
  // TODO: Insert order into Supabase
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 }
  );
}
