import { SUPABASE_CONFIG, isSupabaseConfigured } from "@/config/supabase";
import type { CommunityStats, VoteTalliesMap, VotesMap } from "@/types/awards";

const STORAGE_VOTER_TOKEN_KEY = "ecologica-awards-voter-token-v1";

function generateToken(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${crypto.randomUUID()}-${Date.now().toString(36)}`;
  }
  const part = () => Math.random().toString(36).slice(2, 10);
  return `${part()}-${part()}-${part()}-${Date.now().toString(36)}`;
}

export function getOrCreateVoterToken(): string {
  try {
    const existing = localStorage.getItem(STORAGE_VOTER_TOKEN_KEY);
    if (existing && existing.length >= 16) return existing;
    const created = generateToken();
    localStorage.setItem(STORAGE_VOTER_TOKEN_KEY, created);
    return created;
  } catch {
    return generateToken();
  }
}

async function callRpc<T>(
  fnName: string,
  payload?: Record<string, unknown>
): Promise<T> {
  const baseUrl = SUPABASE_CONFIG.url.replace(/\/+$/, "");
  const res = await fetch(`${baseUrl}/rest/v1/rpc/${fnName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_CONFIG.anonKey,
      Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
    },
    body: JSON.stringify(payload ?? {}),
  });
  if (!res.ok) {
    throw new Error(`rpc_failed_${res.status}`);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function buildLocalStats(votes: VotesMap): CommunityStats {
  const tallies: VoteTalliesMap = {};
  let hasAny = false;
  for (const [categoryId, nomineeId] of Object.entries(votes)) {
    if (!nomineeId) continue;
    hasAny = true;
    tallies[categoryId] = { [nomineeId]: 1 };
  }
  return {
    tallies,
    totalVoters: hasAny ? 1 : 0,
    isLive: false,
  };
}

export function applyOptimisticVote(
  prev: CommunityStats,
  categoryId: string,
  prevNomineeId: string | undefined,
  nextNomineeId: string,
  hadAnyVotesBefore: boolean
): CommunityStats {
  const catTallies = { ...(prev.tallies[categoryId] ?? {}) };
  if (prevNomineeId && prevNomineeId !== nextNomineeId) {
    const decremented = Math.max(0, (catTallies[prevNomineeId] ?? 0) - 1);
    if (decremented === 0) {
      delete catTallies[prevNomineeId];
    } else {
      catTallies[prevNomineeId] = decremented;
    }
  }
  if (prevNomineeId !== nextNomineeId) {
    catTallies[nextNomineeId] = (catTallies[nextNomineeId] ?? 0) + 1;
  }
  return {
    ...prev,
    tallies: {
      ...prev.tallies,
      [categoryId]: catTallies,
    },
    totalVoters: hadAnyVotesBefore
      ? prev.totalVoters
      : Math.max(1, prev.totalVoters + 1),
  };
}

export async function fetchCommunityStats(
  fallbackVotes: VotesMap
): Promise<CommunityStats> {
  if (!isSupabaseConfigured()) {
    return buildLocalStats(fallbackVotes);
  }
  try {
    const [rows, totalVoters] = await Promise.all([
      callRpc<{ category_id: string; nominee_id: string; vote_count: number }[]>(
        "get_vote_tallies"
      ),
      callRpc<number>("get_total_voters"),
    ]);

    const tallies: VoteTalliesMap = {};
    for (const row of rows ?? []) {
      if (!tallies[row.category_id]) {
        tallies[row.category_id] = {};
      }
      tallies[row.category_id][row.nominee_id] = Number(row.vote_count) || 0;
    }

    return {
      tallies,
      totalVoters: Number(totalVoters) || 0,
      isLive: true,
    };
  } catch {
    return buildLocalStats(fallbackVotes);
  }
}

export async function submitCommunityVote(
  categoryId: string,
  nomineeId: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    await callRpc<void>("cast_vote", {
      p_voter_token: getOrCreateVoterToken(),
      p_category_id: categoryId,
      p_nominee_id: nomineeId,
    });
    return true;
  } catch {
    return false;
  }
}

export async function clearCommunityVotes(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    await callRpc<void>("clear_voter_votes", {
      p_voter_token: getOrCreateVoterToken(),
    });
    return true;
  } catch {
    return false;
  }
}
