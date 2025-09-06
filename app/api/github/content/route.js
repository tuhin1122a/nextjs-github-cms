import { GitHubService } from "@/lib/github";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "README.md"; // default file

    console.log("🔹 Requested Path:", path);

    const github = new GitHubService();
    const { content, sha } = await github.getFileContent(path);

    console.log("🔹 File SHA:", sha);

    return NextResponse.json({ content, sha });
  } catch (error) {
    console.error("❌ Error fetching GitHub content:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch content",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
