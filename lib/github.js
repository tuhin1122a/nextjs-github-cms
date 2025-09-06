const GITHUB_API_BASE = "https://api.github.com";

export class GitHubService {
  constructor() {
    this.token = process.env.GITHUB_TOKEN || "";
    this.owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || "";
    this.repo = process.env.NEXT_PUBLIC_GITHUB_REPO || "";
    this.branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main";

    // Debug env variables
    console.log("🔹 GITHUB_TOKEN:", this.token ? "✅ Loaded" : "❌ Missing");
    console.log("🔹 Owner:", this.owner);
    console.log("🔹 Repo:", this.repo);
    console.log("🔹 Branch:", this.branch);
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${GITHUB_API_BASE}${endpoint}`;
    console.log("🔹 GitHub Request URL:", url);

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...options.headers,
      },
    });

    console.log("🔹 Response Status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ GitHub Error Response:", text);
      throw new Error(`GitHub API Error: ${response.status} - ${text}`);
    }

    return response.json();
  }

  async getFileContent(path) {
    try {
      console.log("🔹 Fetching File Content for Path:", path);
      const data = await this.makeRequest(
        `/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`
      );

      console.log("🔹 Raw Data from GitHub:", data);

      if (data.encoding === "base64") {
        const content = Buffer.from(data.content, "base64").toString("utf-8");
        return { content, sha: data.sha };
      }

      return { content: data.content || "", sha: data.sha };
    } catch (error) {
      console.error(`❌ Error fetching file ${path}:`, error);
      throw error;
    }
  }

  async createOrUpdateFile(path, content, message, sha) {
    const body = {
      message,
      content: Buffer.from(content).toString("base64"),
      branch: this.branch,
      ...(sha && { sha }),
    };

    console.log("🔹 Creating/Updating File:", path);
    console.log("🔹 Commit Message:", message);
    if (sha) console.log("🔹 Updating Existing SHA:", sha);

    await this.makeRequest(
      `/repos/${this.owner}/${this.repo}/contents/${path}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
  }

  async publishDrafts(drafts) {
    const contentDir = process.env.NEXT_PUBLIC_CONTENT_DIR || "content";

    for (const draft of drafts) {
      const filename = `${draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
      const filepath = `${contentDir}/${filename}`;
      const content = `# ${draft.title}\n\n${draft.body}`;
      const message = `Add: ${draft.title}`;

      try {
        // Try to get existing file first
        const existing = await this.getFileContent(filepath).catch(() => null);
        await this.createOrUpdateFile(
          filepath,
          content,
          message,
          existing?.sha
        );
      } catch (error) {
        console.error(`❌ Error publishing draft ${draft.title}:`, error);
        throw error;
      }
    }
  }
}
