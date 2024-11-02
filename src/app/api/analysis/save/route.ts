import vercelPostgresAdapter from "@/lib/adapter";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adapter = vercelPostgresAdapter();
  const { analysis, fileName, chatId } = await req.json();
  const savedAnalysis = await adapter?.saveAnalysis?.({
    chatId,
    userId: session.user.id,
    content: analysis,
    fileName: fileName || "",
  });
  return NextResponse.json(savedAnalysis);
}
