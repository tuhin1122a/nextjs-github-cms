import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function POST(request) {
  try {
    const { drafts } = await request.json();

    if (!Array.isArray(drafts) || drafts.length === 0) {
      return NextResponse.json(
        { error: 'No drafts provided' },
        { status: 400 }
      );
    }

    // Validate draft structure
    for (const draft of drafts) {
      if (!draft.title || !draft.body || !draft.id) {
        return NextResponse.json(
          { error: 'Invalid draft structure' },
          { status: 400 }
        );
      }
    }

    const github = new GitHubService();
    await github.publishDrafts(drafts);

    return NextResponse.json({ 
      success: true, 
      published: drafts.length,
      message: `Successfully published ${drafts.length} draft(s)`
    });
  } catch (error) {
    console.error('Error publishing drafts:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to publish drafts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
