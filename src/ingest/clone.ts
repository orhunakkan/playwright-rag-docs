import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { simpleGit } from 'simple-git';
import { PLAYWRIGHT_DEV_REPO } from './sources.js';

export interface ClonedRepo {
  repoPath: string;
  commitSha: string;
}

export async function cloneDocsRepo(): Promise<ClonedRepo> {
  const repoPath = await mkdtemp(join(tmpdir(), 'playwright-rag-docs-sync-'));
  const git = simpleGit();
  await git.clone(PLAYWRIGHT_DEV_REPO, repoPath, ['--depth', '1']);
  const commitSha = (await simpleGit(repoPath).revparse(['HEAD'])).trim();
  return { repoPath, commitSha };
}

export async function cleanupClone(repoPath: string): Promise<void> {
  await rm(repoPath, { recursive: true, force: true });
}
