import vercelPostgresAdapter from "@/lib/adapter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const adapter = vercelPostgresAdapter();
  const { searchParams } = new URL(req.url);
  console.log(req.url, searchParams, "--req.url");

  const chatId = searchParams.get("chatId");
  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }
  const analysis = await adapter?.getAnalysis?.(chatId);
  return NextResponse.json(analysis);
}
