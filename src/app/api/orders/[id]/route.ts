import { NextResponse } from "next/server";

export async function PATCH() {
  // TODO: Update order status in Supabase
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 }
  );
}
